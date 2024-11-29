import React, { useState, useContext, createContext, useEffect } from "react";
import { useToast } from "./useToast";
import { AuthService } from "../services/Auth";
import { Cookie } from "../storage/Cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  user: { name: "", email: "" },
  token: "",
  handleLogin: async (username, pass) => {},
  handleRegister: async (name, pass, email, cpf) => {},
  handleLogout: () => {},
  getUserInfo: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const addToast = useToast();
  const { login, register, getInfoByToken } = AuthService();
  const [tokenLoaded, setTokenLoaded] = useState(false);

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Token inválido: ", error);
      return null;
    }
  };

  useEffect(() => {
    const storageToken = Cookie.getCookie("user");
    if (storageToken) {
      const decodedUser = decodeToken(storageToken);
      if (decodedUser) {
        setUser({ name: decodedUser.name, email: decodedUser.email });
        setToken(storageToken);
      }
    }
    setTokenLoaded(true);
  }, []);

  useEffect(() => {
    const storageToken =
      token || Cookie.getCookie("user");
    if (storageToken) {
      const decodedUser = decodeToken(storageToken);
      
      if (decodedUser) {
        setUser({ name: decodedUser.name, email: decodedUser.email });
      }
    }
  }, [token]);

  const handleLogin = async (username, pass) => {
    if (!username || !pass) {
      addToast("Insira os campos corretamente!", "fail");
      return;
    } 

    const response = await login(username, pass);
    if (response) {
      Cookie.setCookie("user", response.token, 1);
      setToken(response.token);
    }
    addToast(response.data, !response.token ? "fail" : "success");
  };

  const handleRegister = async (name, pass, email, cpf) => {
    if (!name || !pass || !email || !cpf) {
      addToast("Insira os campos corretamente!", "fail");
      return;
    }
    try {
      const response = await register(name, email, pass, cpf);
      if (response) {
        
        addToast(response.data, !response.error ? "fail" : "success");
      }
    } catch (error) {
      addToast("Erro ao fazer registro!", "fail");
    }
  };

  const getUserInfo = async () => {
    
    try {
      const response = await getInfoByToken(token);
      if (response) return response;
    } catch (error) {
      addToast("Erro ao recuperar informações do usuário!", "fail");
    }

  }

  const handleLogout = () => {
    Cookie.eraseCookie("user");
    setToken(null);
    setUser(null);
    addToast("Logout bem-sucedido!", "success");
  };

  return (
    tokenLoaded ? (
      <AuthContext.Provider value={{ user, token, handleLogin, handleRegister, handleLogout, getUserInfo }}>
        {children}
      </AuthContext.Provider>
    ) : (
      <div>Carregando autenticação...</div>
    )
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Need AuthProvider!");
  }

  return context;
};
