import { useState, useContext, createContext, useEffect } from "react";
import { ProductService } from "../services/Product";

const ProductContext = createContext({
  product: [],
});

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const service = ProductService();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await service.GetActiveProducts();

        setProduct(response);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ product }}>
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used within a productProvider");
  }

  return context;
};
