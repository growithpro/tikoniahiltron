import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdmissionFloatingBanner from "./components/AdmissionFloatingBanner.jsx";
import FloatingSocialSidebar from "./components/FloatingSocialSidebar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FloatingSocialSidebar />
    <AdmissionFloatingBanner />
    <App />
  </StrictMode>
);
