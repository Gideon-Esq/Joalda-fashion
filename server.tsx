import { Database } from "bun:sqlite";

const db = new Database("joalda.sqlite");

// Initialize tables
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT 0
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    stockQuantity INTEGER NOT NULL
  )
`);

// Seed Admin User (if not exists)
const adminExists = db.query("SELECT * FROM users WHERE username = 'admin'").get();
if (!adminExists) {
  // Password is 'admin123'
  const hashedPassword = await Bun.password.hash("admin123");
  db.run("INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)", ["admin", hashedPassword, 1]);
}

// Seed Products (if empty)
const productCount = db.query("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const products = [
    {
      name: "Organic Cotton T-Shirt",
      description: "Soft, sustainable, and perfect for everyday wear.",
      price: 25.00,
      category: "standard",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stockQuantity: 100
    },
    {
      name: "Cultural Pattern Shirt",
      description: "Vibrant patterns inspired by traditional designs.",
      price: 45.00,
      category: "cultural",
      imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stockQuantity: 50
    },
    {
      name: "Eco-Friendly Hoodie",
      description: "Warm and cozy, made from recycled materials.",
      price: 60.00,
      category: "standard",
      imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stockQuantity: 75
    },
    {
        name: "Artisan Woven Scarf",
        description: "Hand-woven scarf with intricate details.",
        price: 35.00,
        category: "cultural",
        imageUrl: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        stockQuantity: 30
    }
  ];

  const insert = db.prepare("INSERT INTO products (name, description, price, category, imageUrl, stockQuantity) VALUES (?, ?, ?, ?, ?, ?)");
  const insertProducts = db.transaction(products => {
    for (const product of products) {
        insert.run([product.name, product.description, product.price, product.category, product.imageUrl, product.stockQuantity]);
    }
  });
  insertProducts(products);
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const ADMIN_TOKEN = "admin-token-secure-123";

function isAdmin(req: Request): boolean {
  const authHeader = req.headers.get("Authorization");
  return authHeader === `Bearer ${ADMIN_TOKEN}`;
}

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Serve Static Files (Frontend)
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(Bun.file("public/index.html"), { headers: { "Content-Type": "text/html" } });
    }
    if (url.pathname.startsWith("/assets/") || url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
       // Check public folder
       const file = Bun.file(`public${url.pathname}`);
       if (await file.exists()) {
           return new Response(file);
       }
    }

    // API Routes
    if (url.pathname.startsWith("/api")) {
      try {
        // GET /api/products
        if (url.pathname === "/api/products" && req.method === "GET") {
          const products = db.query("SELECT * FROM products").all();
          return Response.json(products, { headers: CORS_HEADERS });
        }

        // POST /api/products (Admin)
        if (url.pathname === "/api/products" && req.method === "POST") {
          if (!isAdmin(req)) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: CORS_HEADERS });
          }
          const body = await req.json();
          db.run(
            "INSERT INTO products (name, description, price, category, imageUrl, stockQuantity) VALUES (?, ?, ?, ?, ?, ?)",
            [body.name, body.description, body.price, body.category, body.imageUrl, body.stockQuantity]
          );
          return Response.json({ success: true }, { headers: CORS_HEADERS });
        }

        // DELETE /api/products/:id (Admin)
        if (url.pathname.match(/^\/api\/products\/\d+$/) && req.method === "DELETE") {
             if (!isAdmin(req)) {
                return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: CORS_HEADERS });
             }
             const id = url.pathname.split("/").pop();
             db.run("DELETE FROM products WHERE id = ?", [id]);
             return Response.json({ success: true }, { headers: CORS_HEADERS });
        }

        // PUT /api/products/:id (Admin)
        if (url.pathname.match(/^\/api\/products\/\d+$/) && req.method === "PUT") {
            if (!isAdmin(req)) {
                return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: CORS_HEADERS });
            }
            const id = url.pathname.split("/").pop();
            const body = await req.json();
            db.run(
                "UPDATE products SET name = ?, description = ?, price = ?, category = ?, imageUrl = ?, stockQuantity = ? WHERE id = ?",
                [body.name, body.description, body.price, body.category, body.imageUrl, body.stockQuantity, id]
            );
            return Response.json({ success: true }, { headers: CORS_HEADERS });
        }

        // POST /api/auth/login
        if (url.pathname === "/api/auth/login" && req.method === "POST") {
          const { username, password } = await req.json();
          const user = db.query("SELECT * FROM users WHERE username = ?").get(username) as any;

          if (user && await Bun.password.verify(password, user.password)) {
            const token = user.is_admin ? ADMIN_TOKEN : "user-token";
            return Response.json({
                success: true,
                user: { username: user.username, is_admin: !!user.is_admin },
                token: token
            }, { headers: CORS_HEADERS });
          } else {
            return new Response(JSON.stringify({ success: false, error: "Invalid credentials" }), { status: 401, headers: CORS_HEADERS });
          }
        }

        // POST /api/auth/signup
        if (url.pathname === "/api/auth/signup" && req.method === "POST") {
            const { username, password } = await req.json();
            try {
                const hashedPassword = await Bun.password.hash(password);
                db.run("INSERT INTO users (username, password, is_admin) VALUES (?, ?, 0)", [username, hashedPassword]);
                return Response.json({ success: true }, { headers: CORS_HEADERS });
            } catch (e) {
                return new Response(JSON.stringify({ success: false, error: "Username already exists" }), { status: 400, headers: CORS_HEADERS });
            }
        }

        // 404 for unknown API routes
        return new Response(JSON.stringify({ error: "Not Found" }), { status: 404, headers: CORS_HEADERS });

      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: CORS_HEADERS });
      }
    }

    // SPA Fallback - If not an API route or file, serve index.html for React Router
    return new Response(Bun.file("public/index.html"), { headers: { "Content-Type": "text/html" } });
  },
});

console.log("Server running on http://localhost:3000");
