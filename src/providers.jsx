import React from "react";

import { LoadingProvider } from "./hooks/useLoading";

const Providers = ({ children }) => {
  return (
    <>
      <LoadingProvider>{children}</LoadingProvider>
    </>
  );
};

export default Providers;
