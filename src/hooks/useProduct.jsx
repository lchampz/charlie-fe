import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { ProductService } from "../services/Product";
import { useAuth } from "./useAuth";

const ProductContext = createContext({
  product: [],
  
  fetchProducts: () => {},
});

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const { token } = useAuth();

  const fetchProducts = useCallback(async () => {
    const service = ProductService(token);

    try {
      

      const response = await service.GetActiveProducts();

      if (response) {
        setProduct(response);
      } else {
        console.error("[ERROR] " + response);
      }
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  }, [token]);

  useEffect(() => {
    
    
    if (token) {
      fetchProducts();
    }
  }, [token]);

  return (
    <ProductContext.Provider value={{ product, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct não pode ser usado sem ProductProvider");
  }
  return context;
};
