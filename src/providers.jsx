import React from "react";

import { LoadingProvider } from "./hooks/useLoading";
import { BrowserRouter } from "react-router-dom";

const Providers = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </BrowserRouter>
    </>
  );
};

export default Providers;
