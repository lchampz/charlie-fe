import { useState } from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";
import PageWrapper from "../../components/PageWrapper";
import BG from "../../assets/bgcolor.png";
import Logo from "../../assets/logo.png";

import "./styled.scss";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleToggleRegister = () => {
    setIsRegister((prev) => !prev);
  };

  const RegisterForm = () => {
    return (
      <div className="form-register">
        <span
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img className="logo" src={Logo} alt="Logo" />
        </span>

        <span
          style={{ display: "flex", gap: "10px", justifyContent: "stretch" }}
        >
          <Input placeholder={"nome..."} width="100%" padding={"1rem"} />
          <Input placeholder={"sobrenome..."} width="100%" padding={"1rem"} />
        </span>
        <Input placeholder={"email..."} width="100%" padding={"1rem"} />
        <span style={{ display: "flex", gap: "10px" }}>
          <Input placeholder={"CPF..."} width="100%" padding={"1rem"} />
          <Input placeholder={"CEP..."} width="100%" padding={"1rem"} />
        </span>
        <span
          style={{ display: "flex", gap: "10px", justifyContent: "stretch" }}
        >
          <Input placeholder={"endereço..."} width="70%" padding={"1rem"} />
          <Input placeholder={"Nº..."} width="30%" padding={"1rem"} />
        </span>
        <Input placeholder={"senha..."} width="100%" padding={"1rem"} password/>
        <span
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px",
          }}
        >
          <Button
            padding={"1rem 2rem"}
            width="200px"
            placeholder={"Cadastrar"}
            click={handleToggleRegister}
          />
          <Button
            placeholder={"Voltar para login"}
            click={handleToggleRegister}
            link
          />
        </span>
      </div>
    );
  };

  const LoginForm = () => {
    return (
      <>
        <img className="logo" src={Logo} alt="Logo" />
        <div className="input-wrapper">
          <Input placeholder={"login..."} width="300px" padding={"1rem"} />
          <Input
            placeholder={"senha..."}
            width="300px"
            padding={"1rem"}
            password
          />
        </div>

        <span className="login-btns">
          <Button padding={"0.5rem 2rem"} placeholder={"Login"} width="200px" />
          <Button
            padding={"0.5rem 2rem"}
            width="200px"
            placeholder={"Criar conta"}
            click={handleToggleRegister}
          />
        </span>
      </>
    );
  };

  return (
    <PageWrapper bgColor={"#49445B"}>
      <div className="login-wrapper">
        <span className={`column ${isRegister ? "" : "not-show"}`}>
          <RegisterForm />
        </span>

        <div
          id="bg-slider"
          className={`column not-show ${
            isRegister ? "is-register" : "is-login"
          }`}
        >
          <img className="bg-login" src={BG} alt="Background" />
        </div>

        <div className={`column ${isRegister ? "not-show" : ""}`}>
          <LoginForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
