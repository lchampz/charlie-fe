import { useEffect, useState } from "react";
import { ProductService } from "../../services/Product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const service = ProductService();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await service.GetActiveProducts();

        if (isMounted) {
          if (response.status) {
            setProducts(response.data);
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
    <div>
      <h1>Produtos Ativos {products.length}</h1>
      {products.length === 0 ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.PRODUTO_ID}>{product.PRODUTO_NOME}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
