import { useState } from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";
import PageWrapper from "../../components/PageWrapper";
import BG from '../../assets/bgcolor.png';
import Logo from '../../assets/logo.png';

import "./styled.scss"

const Login = () => {
  const [pass, setPass] = useState("");

  const handleChange = (text) => {
    setPass(text);
  };

  return (
    <PageWrapper bgColor={"#49445B"}>
      <div className="login-wrapper">
        <div className="column">
          <img className="bg-login" src={BG}/>
        </div>
        <div className="column">
          <img className="logo" src={Logo}/>
          <div>
            <Input placeholder={"login"} width="80%" />
            <Input placeholder={"senha"} width="80%" password/>
          </div>
          
          <span b>
            <Button placeholder={"Login"}/>
            <Button placeholder={"Criar conta"}/>
          </span>
          
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
