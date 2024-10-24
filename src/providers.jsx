import React from "react";

import { LoadingProvider } from "./hooks/useLoading";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./hooks/useProduct";
import { CartProvider } from "./hooks/useCart";
import { ToastProvider } from "./hooks/useToast";

const Providers = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <ProductProvider>
          <ToastProvider>
            <CartProvider>
              <LoadingProvider>{children}</LoadingProvider>
            </CartProvider>
          </ToastProvider>
        </ProductProvider>
      </BrowserRouter>
    </>
  );
};

export default Providers;
