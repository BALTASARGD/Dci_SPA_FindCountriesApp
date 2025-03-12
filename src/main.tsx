import * as React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router";
import "./style.css";

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<AppRouter />);
}