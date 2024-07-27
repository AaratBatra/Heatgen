// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Heatmap from "./pages/Heatmap.jsx";
import { socket } from "./socket";
import { HeatmapProvider } from "./heatmapContext.jsx";

const router = createBrowserRouter([
  {
    element: <App socket={socket} />,
    path: "/"
  },
  {
    element: <Heatmap socket={socket}><App socket={socket} /></Heatmap>,
    path: "/heatmap"
  }
]);
if (window.self !== window.top) {
  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <HeatmapProvider>
    <RouterProvider router={router} />

  </HeatmapProvider>
);
