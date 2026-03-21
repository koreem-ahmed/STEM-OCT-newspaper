import App from "./App.jsx";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productsReducer from "./features/productsSlice.js";
import { productsApi } from "./features/productsApi.js";

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <Toaster richColors position="top-right" />
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  </StrictMode>
);
