import React from "react";

import { LoadingProvider } from "./hooks/useLoading";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./hooks/useProduct";
import { CartProvider } from "./hooks/useCart";

const Providers = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <ProductProvider>
          <CartProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </CartProvider>
        </ProductProvider>
      </BrowserRouter>
    </>
  );
};

export default Providers;
