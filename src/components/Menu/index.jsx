import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useProduct } from "../../hooks/useProduct";
import Logo from "../../assets/logo.png";
import Search from "../../assets/search.png";
import Cart from "../../assets/cart.png";
import Input from "../Input";
import Button from "../Button";

import "./styled.scss";
import "./mobile.scss";
import { useAuth } from "../../hooks/useAuth";


const Menu = () => {
  const [search, setSearch] = useState({search: ""});
  const { token } = useAuth();
  const { cart, getCounter } = useCart();
  const { searchProducts } = useProduct();
  const navigate = useNavigate();
  const menuOptions = [
    { name: "Home", link: "home" },
    { name: "Produtos", link: "products" },
    { name: "Contato", link: "contact" },
  ];
  

  useEffect(() => {
    searchProducts(search.search.toString().toLowerCase())
  },[search])

  const RenderButton = () => {
    return token ? <Button width="120px" placeholder={"Minha Conta"} click={() =>navigate("/user")} /> : <Button width="120px" placeholder={"Entrar"} click={() =>navigate("/login")} /> 
  }

  return (
    <div className="menu-wrapper">
      <div className="top-side">
        <img className="logo-menu" src={Logo} alt="logo" onClick={() => navigate("/home")}/>
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
          
          <RenderButton />
          <div className="cart-counter">
            {getCounter() > 0 ? <div className="counter">{getCounter()}</div> :null}
            <img onClick={() => navigate("/payout")} className="cart-icon" src={Cart} alt="carrinho" />
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
