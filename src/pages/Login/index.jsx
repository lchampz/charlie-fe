import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { useLoading } from "../../hooks/useLoading";
import Input from "../../components/Input";
import Button from "../../components/Button";
import PageWrapper from "../../components/PageWrapper";
import AlternativeButton from "../../components/AlternativeButton";
import BG from "../../assets/bgcolor.png";
import Logo from "../../assets/logo.png";


import "./styled.scss";

const Login = () => {
  const { handleLogin, handleRegister } = useAuth();
  const { setLoading } = useLoading();
  const addToast = useToast();
  const [isRegister, setIsRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    pass: "",
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    lastname: "",
    email: "",
    cpf: "",
    logradouro: "",
    num: "",
    cep: "",
    registerPass: "",
  });

  const navigate = useNavigate();

  const handleToggleRegister = () => {
    setIsRegister((prev) => !prev);
  };

  const validateLoginForm = () => {
    if (!loginForm.username || !loginForm.pass) {
      addToast("Insira os campos corretamente!", "fail");
      return false;
    }
    return true;
  };


  const login = async () => {
    if (validateLoginForm()) {
      try {
        setLoading(true);
        await handleLogin(loginForm.username, loginForm.pass);
        navigate("/home");
      } finally {
        setLoading(false);
      }
    }
  };

  const register = async () => {
    try {
      setLoading(true);
      await handleRegister(registerForm.name, registerForm.registerPass, registerForm.email, registerForm.cpf);
    } finally {
      setLoading(false);
    }
  };

  const RegisterForm = () => {
    return (
      <div className="form-register">
        <span style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
          <img className="logo" src={Logo} alt="Logo" />
        </span>

        <span style={{ display: "flex", gap: "10px", justifyContent: "stretch" }}>
          <Input
            state={registerForm}
            setState={setRegisterForm}
            name="name"
            value={registerForm.name}
            placeholder={"Nome..."}
            width="100%"
            padding={"1rem"}
          />
        </span>
        <Input
          state={registerForm}
          setState={setRegisterForm}
          name="email"
          value={registerForm.email}
          placeholder={"E-mail..."}
          width="100%"
          padding={"1rem"}
        />
        <span style={{ display: "flex", gap: "10px" }}>
          <Input
            state={registerForm}
            setState={setRegisterForm}
            name="cpf"
            value={registerForm.cpf}
            placeholder={"CPF..."}
            width="100%"
            padding={"1rem"}
          />
        </span>
        <Input
          state={registerForm}
          setState={setRegisterForm}
          name="registerPass"
          value={registerForm.pass}
          placeholder={"Senha..."}
          width="100%"
          padding={"1rem"}
          password
        />
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
          <AlternativeButton
            borderRadius={"30px"}
            padding={"1rem 2rem"}
            width="200px"
            placeholder={"Cadastrar"}
            click={register}
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
          <Input
            state={loginForm}
            setState={setLoginForm}
            name="username"
            value={loginForm.username}
            placeholder={"E-mail..."}
            width="300px"
            padding={"1rem"}
          />
          <Input
            state={loginForm}
            setState={setLoginForm}
            name="pass"
            value={loginForm.pass}
            placeholder={"Senha..."}
            width="300px"
            padding={"1rem"}
            password
          />
        </div>

        <span className="login-btns">
          <AlternativeButton
            borderRadius={"30px"}
            padding={"0.5rem 2rem"}
            click={login}
            placeholder={"Login"}
            width="200px"
          />
          <Button
            link
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
          className={`column not-show ${isRegister ? "is-register" : "is-login"}`}
        >
          <img className="bg-login" src={BG} alt="Background" />
        </div>

        <div style={{ opacity: isRegister ? 0 : 1 }} className={`column ${isRegister ? "not-show" : ""}`}>
          <LoginForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
