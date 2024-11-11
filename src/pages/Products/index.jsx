
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { useCart } from "../../hooks/useCart";
import { useProduct } from "../../hooks/useProduct";
import PageWrapper from '../../components/PageWrapper'

import "./styled.scss"


const Products = () => {
  const [quantity, setQuantity] = useState(0);
  const { product } = useProduct();
  const { addToCart } = useCart();

  const sendToCart = (id, qtd) => {
    const findedItem = product.find((item) => id === item.PRODUTO_ID);

    addToCart(findedItem, qtd);
  };

  return (
    <>
      <Menu />
      <PageWrapper  id="wrapper-products">
        {/* <div className="column"></div> */}
        <div className="column">
          {product?.map((item, i) => (
            <Card key={i} item={item} setState={setQuantity} state={quantity} id={"card-"+item.PRODUTO_ID} click={() => sendToCart(item.PRODUTO_ID, quantity['card-'+item.PRODUTO_ID])}/>
          ))}
        </div>
      </PageWrapper>
    </>
  );
};

export default Products;
