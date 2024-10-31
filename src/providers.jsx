import React from "react";

import { LoadingProvider } from "./hooks/useLoading";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./hooks/useProduct";
import { CartProvider } from "./hooks/useCart";
import { ToastProvider } from "./hooks/useToast";
import { AuthProvider } from "./hooks/useAuth";

const Providers = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <LoadingProvider>
            <ToastProvider>
              <ProductProvider>
                <CartProvider>{children}</CartProvider>
              </ProductProvider>
            </ToastProvider>
          </LoadingProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default Providers;
