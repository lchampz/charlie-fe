import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/User";
import { PaymentService } from "../../services/Payment";
import { useToast } from "../../hooks/useToast";

import Trash from '../../assets/Lixeira.png'
import Exit from '../../assets/exit.svg'

import "./styled.scss";


const Payout = () => {
  const { cart, getSubtotal, removeFromCart, addToCart } = useCart();
  const { user, token } = useAuth();
  const addToast = useToast();
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();

  const SUser = UserService();
  const SPay = PaymentService();

  useEffect(() => {
    const fetchData = async () => {
      const response = await SUser.GetAddress(token);
      setAddress(response);
      setSelectedAddress(response[0].ENDERECO_ID);
    };
    fetchData();
  }, []);

  const pay = async () => {
    const response = await SPay.Pay({cart: cart, address: selectedAddress}, token);
    addToast(response.data, response.error ? "fail" : "success");
  }

  const handleChangeAddress = (e) => {
    if (selectedAddress !== e.target.value) {
      setSelectedAddress(e.target.value);
    }
  };

  const ProductComponent = ({ name, price, img, qtd, item, storage }) => {
    const handleRemoveOne = () => (qtd === 1 ? null : removeFromCart(item, 1));
    const handleAddOne = () =>
      qtd >= storage ? null : addToCart(item, 1, false);
    const handleRemoveFromCart = () => removeFromCart(item, qtd);

    return (
      <div className="row-item">
        <span>
          <p>{name}</p>
          <img src={img} alt={`img ${name}`} />
        </span>
        <span className="wrapper-quantity">
          <p
            style={qtd === 1 ? { color: "white", cursor: "default" } : {}}
            onClick={handleRemoveOne}
          >
            -
          </p>
          <p>{qtd}</p>
          <p
            style={qtd === storage ? { color: "white", cursor: "default" } : {}}
            onClick={handleAddOne}
          >
            +
          </p>
        </span>
        <span>
          <p>R$ {price}</p>
        </span>
        <span>
          <img src={Trash} className="trash-icon" onClick={handleRemoveFromCart} />
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="wrapper-payout">
        <div className="first-column">
          <span>
            <div className="exit" onClick={() => navigate("/")}>
              <img src={Exit} alt="sair" />
         
            </div>
            <p className="title">Carrinho de Compras</p>
          </span>

          <div className="header">
            <p>Produto</p>
            <p>Quantidade</p>
            <p>Preço Total</p>
            <p style={{ color: "white" }}>Excluir</p>
          </div>
          <div className="wrapper-items">
            {cart.length > 0 ? (
              cart.map((item) => (
                <ProductComponent
                  key={item.PRODUTO_ID}
                  name={item.PRODUTO_NOME}
                  price={item.PRODUTO_PRECO}
                  storage={item.estoque.PRODUTO_QTD}
                  img={item.imagens[0].IMAGEM_URL}
                  qtd={item.qtd}
                  item={item}
                />
              ))
            ) : (
              <p style={{ margin: "0 auto", color: "grey", opacity: 0.3, marginTop: "10px" }}>
                CARRINHO VAZIO
              </p>
            )}
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

          <div className="address-wrapper">
            <p>Selecione seu endereço: </p>

            {address?.map((item, i) => (
              <div className="address" key={i}>
                <input
                  onChange={handleChangeAddress}
                  type="radio"
                  id={item.ENDERECO_NOME}
                  name="address"
                  value={item.ENDERECO_ID}
                  {...selectedAddress == item.ENDERECO_ID ? {checked: true} : {checked: false}}
                />
                <label htmlFor={item.ENDERECO_NOME}>{item.ENDERECO_NOME}</label>
              </div>
            ))}
          </div>
          <div className="payment-info">
            <span>
              <label>Nome na Nota Fiscal</label>
              <p>{user?.name}</p>
            </span>
            <span>
              <label>CPF</label>
              <p>126.***.***-**</p>
            </span>
            <span>
              <label>Email</label>
              <p>{user?.email}</p>
            </span>
            <button onClick={pay} className="btn-checkout">
              Finalizar Pagamento
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payout;
