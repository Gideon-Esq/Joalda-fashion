import { expect, test } from "bun:test";

const BASE_URL = "http://localhost:3000";

test("GET /api/products returns products", async () => {
  const response = await fetch(`${BASE_URL}/api/products`);
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
});

test("POST /api/auth/login works for admin", async () => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username: "admin", password: "admin123" }),
  });
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.success).toBe(true);
  expect(data.user.username).toBe("admin");
  expect(data.token).toBeDefined();
});
