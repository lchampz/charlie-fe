import  { useState, useContext, createContext, useEffect } from "react";
import { ProductService } from "../services/Product";

const ProductContext = createContext({
  product: []
});

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const service = ProductService();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await service.GetActiveProducts();

        if (isMounted) {
          if (response.status) {
            setProduct(response.data);
          } else {
            console.log("[ERROR] " + response.data);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProductContext.Provider value={{ product }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used within a productProvider");
  }

  return context;
};
