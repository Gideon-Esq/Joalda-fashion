import { Database } from "bun:sqlite";

/**
 * @file Server-side logic for the Joalda Fashion application.
 * @description This file sets up a Bun server to handle API requests, serve static files,
 * and manage the SQLite database.
 */

/**
 * Represents a product in the store.
 * @interface Product
 */
interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: "cultural" | "standard";
  imageUrl: string;
  stockQuantity: number;
}


// Initialize database and create table
const db = new Database("joalda.sqlite", { create: true });
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


console.log("Server starting...");

Bun.serve({
  port: 3000,
  /**
   * Handles incoming HTTP requests.
   * @param {Request} request - The incoming request object.
   * @returns {Promise<Response>} A promise that resolves to a Response object.
   */
  async fetch(request) {
    const url = new URL(request.url);
    console.log(`${request.method} ${url.pathname}`);

    // API route: Get all products
    if (url.pathname === "/products" && request.method === "GET") {
      const products = db.query("SELECT * FROM products").all();
      return new Response(JSON.stringify(products), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // API route: Add a new product
    if (url.pathname === "/add-product" && request.method === "POST") {
      try {
        const product: Product = await request.json();
        db.run(
          `INSERT INTO products (name, description, price, category, imageUrl, stockQuantity)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            product.name,
            product.description,
            product.price,
            product.category,
            product.imageUrl,
            product.stockQuantity,
          ],
        );
        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
      }
    }

    // API route: Delete a product
    const deleteMatch = url.pathname.match(/^\/delete-product\/(\d+)$/);
    if (deleteMatch && request.method === "DELETE") {
      const productId = deleteMatch[1];
      db.run(`DELETE FROM products WHERE id = ?`, [productId]);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Serve client-side bundle
    if (url.pathname === "/client.js") {
        const result = await Bun.build({
            entrypoints: ['./client.tsx'],
            target: 'browser',
        });

        if (result.success) {
            return new Response(result.outputs[0], {
                headers: { "Content-Type": "application/javascript" },
            });
        } else {
            console.error("Build failed:", result.logs);
            return new Response("Build failed", { status: 500 });
        }
    }

    // Serve CSS file
    if (url.pathname === "/styles.css") {
      return new Response(Bun.file("styles.css"), {
        headers: { "Content-Type": "text/css" },
      });
    }

    // Serve the main HTML page
    if (url.pathname === "/") {
      return new Response(
        `
        <html>
          <head>
            <title>Joalda Fashion</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link href="/styles.css" rel="stylesheet">
          </head>
          <body>
            <div id="root"></div>
            <script src="/client.js"></script>
          </body>
        </html>
      `,
        {
          headers: { "Content-Type": "text/html" },
        },
      );
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("Listening on http://localhost:3000");
