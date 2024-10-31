import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import Logo from "../../assets/logo.png";
import Search from "../../assets/search.png";
import Cart from "../../assets/cart.png";
import Input from "../Input";
import Button from "../Button";
// import menu_ondinha from "../../assets/menu.png";
// import Menu_back from "../../assets/menu.png";

import "./styled.scss";
import "./mobile.scss";


const Menu = () => {
  const [search, setSearch] = useState({ search: "" });
  const { cart, getCounter } = useCart();
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
            placeholder={"Procure um Produto..."}
            width="100%"
            padding={"0.5rem"}
            icon={Search}
          />
          <Button width="120px" placeholder={"Entrar"} />
          <div className="cart-counter">
            {getCounter() > 0 ? <div className="counter">{getCounter()}</div> :null}
            <img onClick={() => console.log(cart)} className="cart-icon" src={Cart} alt="carrinho" />
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
