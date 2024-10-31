import { useState, useContext, createContext, useEffect, useCallback } from "react";
import { ProductService } from "../services/Product";
import { useLoading } from "./useLoading";

const ProductContext = createContext({
  product: [],
  loading: true,
  fetchProducts: () => {},
});

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const service = ProductService();
  
  const { loading, setLoading } = useLoading()

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      
      const response = await service.GetActiveProducts();
      
      if (response) {
        
        setProduct(response);
      } else {
        console.error("[ERROR] " + response);
      }
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setLoading(false);
      
    }
  }, [service]);

  useEffect(() => {
     fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ product, fetchProducts, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
