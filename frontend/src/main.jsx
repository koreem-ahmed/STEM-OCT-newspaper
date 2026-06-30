import App from "./App.jsx";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext";
import "./tailwind.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);
