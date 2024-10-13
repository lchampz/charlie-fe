import { useEffect, useState } from "react";
import Button from "../Button";

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
};

const Card = ({ item = props, title = "comprar", click, setState, state, id }) => {

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      setState((prevState) => ({...prevState, [id]: 1}));
    }

    return () => {isMounted = false};
  }, [])

  const QuantityComponent = () => {
    const add = () => {
      console.log(state);
      setState((prevState) => ({ ...prevState, [id]:  prevState[id] + 1 }));
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
    <div className="card">
      <div className="card-img">
        <div className="discount-percentage">15% off</div>
        <img src={item.imagens[0].IMAGEM_URL} alt="imagem produto" />
      </div>
      <div className="card-info">
        <p className="card-title">{item.PRODUTO_NOME}</p>
        {item.PRODUTO_DESCONTO && item.PRODUTO_DESCONTO > 0 && <p className="old-price">R$ {item.PRODUTO_PRECO}</p>}
        <p className="new-price">
          R${" "}
          {(parseFloat(item.PRODUTO_PRECO) - parseFloat(item.PRODUTO_DESCONTO ?? 0)).toPrecision(3).replace(".", ",")}
        </p>
        <div className="card-btns">
          {QuantityComponent()}
          <Button click={click} placeholder={title} />
        </div>
      </div>
    </div>
  );
};

export default Card;
