import { useState } from "react";
import CookieShow from "../../assets/pass-icon-show.png";
import CookieOcult from "../../assets/pass-icon-ocult.png";

import "./styled.scss";

const Input = ({
  change,
  placeholder,
  password = false,
  type = "text",
  value,
  width = "fit-content"
}) => {
  // props desestruturadas
  const [visiblePass, setVisiblePass] = useState(false); //state que vai controlar se a senha é visivel ou não

  //Handlers -> tudo que atua após uma ação, ex. "handleClick" será chamada após o click
  const handleChange = (e) => change(e.target.value); //quando alteramos o valor de um input, o evento "onChange" é ativado (parametro "e"), nisso conseguimos manipular o valor inserido, q ta no obj target.value
  const handleChangePassVisibility = () => setVisiblePass(!visiblePass); //altera a visibilidade da senha

  return (
    <div className="pass-wrapper">
      <input
        style={{minWidth: width}}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        type={!password ? type : visiblePass ? "text" : "password"}
        className="custom-input"
      />
      {password && ( // condicional, se a prop "password" for verdadeira, aparece o cookie q esconde/mostra a senha 
        <img
          className="pass-visibility-icon"
          onClick={handleChangePassVisibility}
          src={visiblePass ? CookieShow : CookieOcult}
          alt="mudar visibilidade da senha"
        />
      )}
    </div>
  );
};

export default Input;
