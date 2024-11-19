import { useCart } from "../../hooks/useCart";

import "./styled.scss";

const Payout = () => {
  const { cart, getSubtotal, removeFromCart, addToCart } = useCart();

  const ProductComponent = ({ name, price, img, qtd, item, storage }) => {
    const handleRemoveOne = () => qtd === 1 ? null : removeFromCart(item, 1);
    const handleAddOne = () => qtd >= storage ? null : addToCart(item, 1, false)
    const handleRemoveFromCart = () => removeFromCart(item, qtd)

    return (
      <div className="row-item">
        <span>
          <p>{name}</p>
          <img src={img} alt={`img ${name}`} />
        </span>
        <span className="wrapper-quantity">
            <p onClick={handleRemoveOne}>-</p>
          <p>{qtd}</p>
          <p onClick={handleAddOne}>+</p>
        </span>
        <span>
          <p>R$ {price}</p>
        </span>
        <span>
          <p onClick={handleRemoveFromCart}>X</p>
        </span>
      </div>
    );
  };

  return (
    <div className="wrapper-payout">
      <div className="first-column">
        <p className="title">Carrinho de Compras</p>
        <div className="header">
          <p>Produto</p>
          <p>Quantidade</p>
          <p>Preço Total</p>
          <p style={{ color: "white" }}>Excluir</p>
        </div>
        <div className="wrapper-items">
          {cart.map((item) => (
            <ProductComponent
              key={item.PRODUTO_ID}
              name={item.PRODUTO_NOME}
              price={item.PRODUTO_PRECO}
              storage={item.estoque.PRODUTO_QTD}
              img={item.imagens[0].IMAGEM_URL}
              qtd={item.qtd}
              item={item}
            />
          ))}
        </div>
        <div className="subtotal">
          <span>
            <label>Subtotal: </label>
            <p>R$ {getSubtotal().toFixed(2) ?? "0,00"}</p>
          </span>
          <span>
            <label>Entrega: </label>
            <p className="green">Grátis</p>
          </span>
          <span>
            <label>Total: </label>
            <p>R$ {getSubtotal().toFixed(2) ?? "0,00"} </p>
          </span>
        </div>
      </div>
      <div className="second-column">
        <p className="title">Informações de pagamento</p>
        <div className="address-wrapper"></div>
        <div className="payment-info">
          <span>
            <label>Nome na Nota Fiscal</label>
            <p>Victor Hugo</p>
          </span>
          <span>
            <label>CPF</label>
            <p>126.***.***-**</p>
          </span>
          <span>
            <label>Email</label>
            <p>joca11victor@*******.com</p>
          </span>
          <button onClick={() => console.log(cart)} className="btn-checkout">
            Finalizar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payout;
