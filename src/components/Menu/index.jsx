import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-menu.png";
import Search from "../../assets/search.png";
import Cart from "../../assets/cart.png";
import Input from "../Input";
import Button from "../Button";

import "./styled.scss";

const Menu = () => {
  const [search, setSearch] = useState({ search: "" });
  const navigate = useNavigate();
  const menuOptions = [
    { name: "Home", link: "home" },
    { name: "Produtos", link: "products" },
    { name: "Contato", link: "contact" },
  ];

  return (
    <div className="menu-wrapper">
      <div className="top-side">
        <img className="logo-menu" src={Logo} alt="logo" />
        <div className="wrapper-menu-btns">
          <Input
            state={search}
            setState={setSearch}
            name="search"
            value={search.search}
            placeholder={"Procure um produto..."}
            width="100%"
            padding={"0.5rem"}
            icon={Search}
          />
          <Button width="120px" placeholder={"entrar"} />
          <div className="cart-counter">
            <span className="counter"></span>
            <img className="cart-icon" src={Cart} alt="carrinho" />
          </div>
        </div>
      </div>
      <div className="bot-side">
        {menuOptions.map((item, i) => (
            <a key={i} onClick={() => navigate("/" + item.link)} className="menu-item">{item.name}</a>
        ))}
      </div>
    </div>
  );
};

export default Menu;
