import { useEffect, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";

import "./styled.scss";


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
  title = "comprar",
  click,
  setState,
  state,
  id,
}) => {
  const [modal, setModal] = useState(false);

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
    setModal((prevState) => (!prevState));
  };

  const QuantityComponent = () => {
    const add = () => {
      if (state[id] >= item.estoque.PRODUTO_QTD) return;
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
      <div className="card">
        <span
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={handleOpenCloseModal}
        >
          <div className="card-img">
            <div className="discount-percentage">15% off</div>
            <img src={item.imagens[0].IMAGEM_URL} alt="imagem produto" />
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
          <Button click={click} placeholder={title} />
        </div>
      </div>
      <Modal item={item} open={modal} close={handleOpenCloseModal}/>
    </>
  );
};

export default Card;
