import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { ProductService } from "../services/Product";

const ProductContext = createContext({
  product: [],
  searchedProducts: [],
  searchProducts: (name) => {},
  fetchProducts: () => {},
});

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [ searchedProducts, setSearchedProducts ] = useState([]);

  const fetchProducts = useCallback(async () => {
    const service = ProductService();

    try {
      const response = await service.GetActiveProducts();
      if (response) {
        setProduct(response);
        setSearchedProducts(response);
      } else {
        console.error("[ERROR] " + response);
      }
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [])

  const searchProducts = (name) => {
    const filteredProducts = product.filter(item =>
      item.PRODUTO_NOME.toLowerCase().includes(name.toLowerCase())
    );
    setSearchedProducts(filteredProducts);
  };

  return (
    <ProductContext.Provider value={{ product, fetchProducts, searchedProducts, searchProducts}}>
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
