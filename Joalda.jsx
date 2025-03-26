/** @jsxImportSource https://esm.sh/react@18.2.0 */
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import React, { useEffect, useState } from "https://esm.sh/react@18.2.0";

// Vibrant color palette reflecting cultural inspiration
const COLORS = {
  primary: "#8B4513", // Rich earthy brown
  secondary: "#FFA500", // Warm orange
  accent: "#2E8B57", // Cultural green
  background: "#F5DEB3", // Wheat-like background
  text: "#333333",
  danger: "#DC143C", // Crimson for delete actions
};

// Product type definition
interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: "cultural" | "standard";
  imageUrl: string;
  stockQuantity: number;
}

export default async function server(request: Request): Promise<Response> {
  const { sqlite } = await import("https://esm.town/v/stevekrouse/sqlite");
  const KEY = new URL(import.meta.url).pathname.split("/").at(-1);

  // Initialize products table
  await sqlite.execute(`
    CREATE TABLE IF NOT EXISTS ${KEY}_products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      stockQuantity INTEGER NOT NULL
    )
  `);

  // Handle routes
  const url = new URL(request.url);

  if (url.pathname === "/products" && request.method === "GET") {
    const result = await sqlite.execute(`SELECT * FROM ${KEY}_products`);
    return Response.json(result.rows);
  }

  if (url.pathname === "/add-product" && request.method === "POST") {
    const product = await request.json();
    await sqlite.execute(
      `INSERT INTO ${KEY}_products 
      (name, description, price, category, imageUrl, stockQuantity) 
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
    return Response.json({ success: true });
  }

  // New route for deleting products
  const deleteMatch = url.pathname.match(/^\/delete-product\/(\d+)$/);
  if (deleteMatch && request.method === "DELETE") {
    const productId = deleteMatch[1];
    await sqlite.execute(`DELETE FROM ${KEY}_products WHERE id = ?`, [productId]);
    return Response.json({ success: true });
  }

  // Serve HTML for the main application
  return new Response(
    `
    <html>
      <head>
        <title>Joalda Fashion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <style>
          body { 
            margin: 0; 
            font-family: 'Raleway', 'Garamond', serif; 
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script src="https://esm.town/v/std/catch"></script>
        <script type="module" src="${import.meta.url}"></script>
      </body>
    </html>
  `,
    {
      headers: { "Content-Type": "text/html" },
    },
  );
}

function SecurityQuestionModal({
  onClose,
  onSuccess,
  actionType,
}: {
  onClose: () => void;
  onSuccess: () => void;
  actionType: "add" | "delete";
}) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (answer.trim() === "2024") {
      onSuccess();
      onClose();
    } else {
      setError("Incorrect answer. Please try again.");
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          width: "300px",
        }}
      >
        <h3 style={{ color: COLORS.primary }}>Security Question</h3>
        <p>When is Joalda founded?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the founding year"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: COLORS.secondary,
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: COLORS.primary,
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: COLORS.primary,
        color: "white",
        padding: "20px",
        textAlign: "center",
        fontFamily: "'Raleway', 'Garamond', serif",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          maxWidth: "800px",
          margin: "0 auto 20px auto",
        }}
      >
        <div style={{ margin: "10px" }}>
          <h4 style={{ margin: "0 0 10px 0", fontWeight: 600 }}>Joalda Fashion</h4>
          <p style={{ margin: 0, fontSize: "14px" }}>
            Crafting style with cultural roots since 2024
          </p>
        </div>
        <div style={{ margin: "10px" }}>
          <h4 style={{ margin: "0 0 10px 0", fontWeight: 600 }}>Quick Links</h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "14px",
            }}
          >
            <li>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ color: COLORS.secondary, textDecoration: "none" }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ color: COLORS.secondary, textDecoration: "none" }}
              >
                Cart
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ color: COLORS.secondary, textDecoration: "none" }}
              >
                Add Product
              </a>
            </li>
          </ul>
        </div>
        <div style={{ margin: "10px" }}>
          <h4 style={{ margin: "0 0 10px 0", fontWeight: 600 }}>Contact Us</h4>
          <p style={{ margin: 0, fontSize: "14px" }}>
            Email: support@joalda.com
          </p>
          <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
            Phone: +1 (555) 123-4567
          </p>
        </div>
      </div>
      <div
        style={{
          borderTop: `1px solid ${COLORS.secondary}`,
          paddingTop: "10px",
          fontSize: "12px",
        }}
      >
        © {new Date().getFullYear()} Joalda Fashion. All rights reserved.
      </div>
    </footer>
  );
}
function App() {
  const [view, setView] = useState<"home" | "cart" | "add-product" | "product-detail">("home");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<{
    category?: "cultural" | "standard";
    minPrice?: number;
    inStock?: boolean;
  }>({});
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    {
      type: "add" | "delete";
      data?: Product | number;
    } | null
  >(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await fetch("/products");
    const data = await response.json();
    setProducts(data);
  }

  async function deleteProduct(productId: number) {
    setPendingAction({ type: "delete", data: productId });
    setShowSecurityModal(true);
  }

  function addToCart(product: Product) {
    setCart([...cart, product]);
  }

  function processPendingAction() {
    if (!pendingAction) return;

    if (pendingAction.type === "delete") {
      const productId = pendingAction.data as number;
      fetch(`/delete-product/${productId}`, { method: "DELETE" })
        .then(async (response) => {
          if (response.ok) {
            await fetchProducts();
            setView("home");
            alert("Product deleted successfully!");
          }
        });
    } else if (pendingAction.type === "add") {
      const product = pendingAction.data as Product;
      fetch("/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }).then((response) => {
        if (response.ok) {
          alert("Product added successfully!");
          fetchProducts();
          setView("home");
        }
      });
    }

    setPendingAction(null);
  }

  function AddProductForm() {
    const [newProduct, setNewProduct] = useState<Product>({
      name: "",
      description: "",
      price: 0,
      category: "standard",
      imageUrl: "",
      stockQuantity: 0,
    });

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setPendingAction({ type: "add", data: newProduct });
      setShowSecurityModal(true);
    }

    return (
      <div
        style={{
          backgroundColor: COLORS.background,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Raleway', 'Garamond', serif",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: COLORS.primary, textAlign: "center" }}>Add New Product</h2>
          <div style={{ marginBottom: "10px" }}>
            <label>Name:</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Description:</label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Price:</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              required
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Category:</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
              style={{ width: "100%", padding: "5px" }}
            >
              <option value="standard">Standard</option>
              <option value="cultural">Cultural</option>
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Image URL:</label>
            <input
              type="url"
              value={newProduct.imageUrl}
              onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
              required
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Stock Quantity:</label>
            <input
              type="number"
              value={newProduct.stockQuantity}
              onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: Number(e.target.value) })}
              required
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: COLORS.secondary,
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="material-icons" style={{ marginRight: "5px" }}>add_circle</span>
            Add Product
          </button>
        </form>
      </div>
    );
  }

  function renderContent() {
    switch (view) {
      case "home":
        return (
          <div style={{ backgroundColor: COLORS.background, minHeight: "100vh", padding: "20px" }}>
            <h1 style={{ color: COLORS.primary, textAlign: "center" }}>Joalda Fashion</h1>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <select
                onChange={(e) => setFilter({ ...filter, category: e.target.value as any })}
                style={{ marginRight: "10px", padding: "5px" }}
              >
                <option value="">All Categories</option>
                <option value="cultural">Cultural Shirts</option>
                <option value="standard">Standard Shirts</option>
              </select>

              <input
                type="number"
                placeholder="Min Price"
                onChange={(e) => setFilter({ ...filter, minPrice: Number(e.target.value) })}
                style={{ marginRight: "10px", padding: "5px" }}
              />

              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  onChange={(e) => setFilter({ ...filter, inStock: e.target.checked })}
                />
                In Stock
              </label>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
              }}
            >
              {products
                .filter(p =>
                  (!filter.category || p.category === filter.category)
                  && (!filter.minPrice || p.price >= filter.minPrice)
                  && (filter.inStock === undefined || (filter.inStock ? p.stockQuantity > 0 : true))
                )
                .map(product => (
                  <div
                    key={product.id}
                    style={{
                      border: `2px solid ${COLORS.secondary}`,
                      borderRadius: "10px",
                      padding: "10px",
                      textAlign: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ maxWidth: "100%", height: "250px", objectFit: "cover" }}
                    />
                    <h3 style={{ color: COLORS.primary }}>{product.name}</h3>
                    <p>₦{product.price.toFixed(2)}</p>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setView("product-detail");
                      }}
                      style={{
                        backgroundColor: COLORS.accent,
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "5px",
                        marginRight: "10px",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                ))}
            </div>
          </div>
        );

      case "cart":
        return (
          <div style={{ backgroundColor: COLORS.background, minHeight: "100vh", padding: "20px" }}>
            <h2 style={{ color: COLORS.primary }}>Your Cart</h2>
            {cart.map(product => (
              <div key={product.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "100px", marginRight: "10px" }}
                />
                <div>
                  <h3>{product.name}</h3>
                  <p>₦{product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => alert("Checkout complete!")}
              style={{
                backgroundColor: COLORS.secondary,
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Checkout
            </button>
          </div>
        );

      case "add-product":
        return <AddProductForm />;

      case "product-detail":
        return selectedProduct
          ? (
            <div
              style={{
                display: "flex",
                backgroundColor: COLORS.background,
                minHeight: "100vh",
                padding: "20px",
              }}
            >
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                style={{ maxWidth: "50%", objectFit: "cover" }}
              />
              <div style={{ padding: "20px" }}>
                <h2 style={{ color: COLORS.primary }}>{selectedProduct.name}</h2>
                <p>{selectedProduct.description}</p>
                <p>Price: ₦{selectedProduct.price.toFixed(2)}</p>
                <p>Category: {selectedProduct.category}</p>
                <p>Stock: {selectedProduct.stockQuantity}</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    style={{
                      backgroundColor: COLORS.accent,
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => deleteProduct(selectedProduct.id!)}
                    style={{
                      backgroundColor: COLORS.danger,
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          )
          : null;
    }
  }
  return (
    <div>
      <nav
        style={{
          backgroundColor: COLORS.primary,
          color: "white",
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        <button onClick={() => setView("home")}>Home</button>
        <button onClick={() => setView("cart")}>Cart ({cart.length})</button>
        <button onClick={() => setView("add-product")}>Add Product</button>
      </nav>
      {renderContent()}
      {showSecurityModal && (
        <SecurityQuestionModal
          onClose={() => {
            setShowSecurityModal(false);
            setPendingAction(null);
          }}
          onSuccess={() => {
            processPendingAction();
          }}
          actionType={pendingAction?.type || "add"}
        />
      )}
      <Footer />
    </div>
  );
}

function client() {
  createRoot(document.getElementById("root")).render(<App />);
}
if (typeof document !== "undefined") { client(); 
