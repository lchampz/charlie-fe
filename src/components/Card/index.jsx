/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import no_sweet from "../../assets/no-sweet.png";

import "./styled.scss";
import { useToast } from "../../hooks/useToast";

const props = {
  PRODUTO_ID: 0,
  PRODUTO_NOME: "",
  PRODUTO_PRECO: "",
  PRODUTO_DESCONTO: "",
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

const Card = ({
  item = props,
  title = "Comprar",
  click,
  setState,
  state,
  id,
}) => {
  const [modal, setModal] = useState(false);
  const addToast = useToast();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setState((prevState) => ({ ...prevState, [id]: 1 }));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenCloseModal = () => {
    if (!item.estoque) {
      addToast("Produto sem estoque!", "fail");
      return;
    }
    setModal((prevState) => !prevState);
  };

  const QuantityComponent = () => {
    const add = () => {
      if (state[id] >= (item.estoque?.PRODUTO_QTD ?? 0)) return;
      setState((prevState) => ({ ...prevState, [id]: prevState[id] + 1 }));
    };

    const remove = () => {
      if (state[id] <= 1) return;
      setState((prevState) => ({ ...prevState, [id]: prevState[id] - 1 }));
    };

    return (
      <div className="wrapper-quantity">
        <div onClick={remove} className="side">
          -
        </div>
        <div className="mid">{state[id]}</div>
        <div onClick={add} className="side">
          +
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="off">
      <div className="card" style={item.estoque <= 0 || !item.estoque ? {backgroundColor: "background-color: rgba(0, 0, 0, 0.3)", opacity: "0.5", cursor: "not-allowed"} : {}}>
          <span
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={item.estoque > 0 || item.estoque ? handleOpenCloseModal : null}
          >
            <div className="card-img">
              {item.PRODUTO_DESCONTO && item.PRODUTO_DESCONTO !== "0.00" ? (
                <div className="discount-percentage">
                  {(item.PRODUTO_PRECO / item.PRODUTO_DESCONTO).toFixed(0)}% off
                </div>
              ) : null}
              {item.imagens &&
              item.imagens.length > 0 &&
              item.imagens[0].IMAGEM_URL ? (
                <img src={item.imagens[0].IMAGEM_URL} alt="imagem produto" />
              ) : (
                <img id="no_sweet" src={no_sweet} alt="imagem padrão" />
              )}
            </div>
            <div className="card-info">
              <p className="card-title">{item.PRODUTO_NOME}</p>
              {item.PRODUTO_DESCONTO && item.PRODUTO_DESCONTO > 0 && (
                <p className="old-price">R$ {item.PRODUTO_PRECO}</p>
              )}
              <p className="new-price">
                R${" "}
                {(
                  parseFloat(item.PRODUTO_PRECO) -
                  parseFloat(item.PRODUTO_DESCONTO ?? 0)
                )
                  .toPrecision(3)
                  .replace(".", ",")}
              </p>
            </div>
          </span>
          <div className="card-btns">
            {QuantityComponent()}
            <Button click={item.estoque > 0 ||item.estoque  || item.estoque !== "0"? click : null} placeholder={title} />
          </div>
        </div>
      </div>
      <Modal item={item} open={modal} close={handleOpenCloseModal} />
    </>
  );
};

export default Card;
