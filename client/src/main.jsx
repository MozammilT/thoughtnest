import { createRoot } from "react-dom/client";
import { BrowseRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowseRouter>
    <App />
  </BrowseRouter>
);
