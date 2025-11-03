import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

/**
 * @file Client-side entry point
 * @description This file is the entry point for the React application. It renders the main App component into the DOM.
 */

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
