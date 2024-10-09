

import { useProduct } from "../../hooks/useProduct";

const Home = () => {
  const { product } = useProduct() ;


  return (
    <div>
      <h1>Produtos Ativos {product.length}</h1>
      {product.length === 0 ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul>
          {product.map((product) => (
            <li key={product.PRODUTO_ID}>{product.PRODUTO_NOME}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
