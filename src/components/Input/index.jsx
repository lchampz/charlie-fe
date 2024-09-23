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
}) => {
  const [visiblePass, setVisiblePass] = useState(false);

  //Handlers
  const handleChange = (e) => change(e.target.value);
  const handleChangePassVisibility = () => setVisiblePass(!visiblePass);

  return (<div className="pass-wrapper">
    <input
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      type={!password ? type : visiblePass ? "text" : "password"}
      className="custom-input"
    />
    {password && (
      <img
        className="pass-visibility-icon"
        onClick={handleChangePassVisibility}
        src={visiblePass ? CookieShow : CookieOcult}
        alt="mudar visibilidade da senha"
      />
    )}
  </div>);
};

export default Input;
