import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useProduct } from "../../hooks/useProduct";
import Close from "../../assets/close.png";

import "./styled.scss";

const props = {
  PRODUTO_ID: 0,
  PRODUTO_NOME: "",
  PRODUTO_PRECO: "",
  PRODUTO_DESCONTO: "",
  PRODUTO_DESC: "",
  categoria: {
    CATEGORIA_ID: 0,
    CATEGORIA_NOME: "",
    CATEGORIA_DESC: "",
  },
  imagens: [
    {
      IMAGEM_ID: 0,
      IMAGEM_ORDEM: 0,
      IMAGEM_URL: "",
    },
  ],
  estoque: { PRODUTO_ID: 0, PRODUTO_QTD: 0 },
};

const Modal = ({ item = props, open, close }) => {
  const [quantity, setQuantity] = useState(1);
  const [img, setImg] = useState(item.imagens[0]?.IMAGEM_URL || "");
  const { product } = useProduct();
  const { addToCart } = useCart();

  const handleChangeQuantity = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 1 || value > (item.estoque.PRODUTO_QTD ?? 0)) return;
    setQuantity(value);
  };

  const sendToCart = () => {
    const findedItem = product.find(
      (product) => item.PRODUTO_ID === product.PRODUTO_ID
    );

    if(findedItem) addToCart(findedItem, quantity);
  };

  const handleChangeImg = (url) => {
    setImg(url);
  };

  return (
    open && (
      <>
        <div
          className="background-loading"
          style={{ backgroundColor: "rgba(0, 0, 0, .45)" }}
        >
          <div className="modal-wrapper">
            <div className="modal-header">
              <span className="modal-title">{item.PRODUTO_NOME}</span>
              <img src={Close} className="close-modal" onClick={close} />
            </div>
            <div className="modal-body">
              <div className="modal-wrapper-imgs">
                <div className="modal-img">
                  <img src={img}></img>
                </div>
              </div> 
              <div className="modal-desc">
                <div className="description">
                  <p>Descrição</p>
                  <p>{item.PRODUTO_DESC}</p>
                </div>

                <div className="product-imgs">
                  <div className="modal-btn-wrapper">
                    <div className="storage">
                      <p>SELECIONA A QUANTIDADE</p>
                      <p>Estoque: {item?.estoque?.PRODUTO_QTD  ? item?.estoque?.PRODUTO_QTD : 0}</p>
                    </div>
                    <div className="btn-add">
                      <input
                        type="number"
                        value={quantity}
                        onChange={handleChangeQuantity}
                        min={1}
                        max={item.estoque.PRODUTO_QTD ?? 0}
                        className="product-quantity"
                      />
                      <button className="cart-btn" onClick={sendToCart}>
                        ADICIONAR AO CARRINHO
                      </button>
                    </div>
                  </div>
                  <div className="imgs">
                    {item.imagens.map((item, i) => (
                      <img
                        key={i}
                        onClick={() => handleChangeImg(item.IMAGEM_URL)}
                        src={item.IMAGEM_URL}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
