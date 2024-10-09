import Menu from "../../components/Menu";
import { useCart } from "../../hooks/useCart";
import { useProduct } from "../../hooks/useProduct";


const Products = () => {
    const { product } = useProduct();
    const { cart, addToCart  } = useCart();
    
    const sendToCart = (id) => {
        const findedItem = product.find((item) => id === item.PRODUTO_ID);

        addToCart(findedItem);
    }

    return ( <>
    <Menu />
    { <ul>
          {product.map((product) => (
            <li onClick={() => sendToCart(product.PRODUTO_ID)} key={product.PRODUTO_ID}>{product.PRODUTO_NOME}</li>
          ))}
        </ul>}
    </> );
}
 
export default Products;