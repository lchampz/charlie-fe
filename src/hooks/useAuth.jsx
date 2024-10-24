import React, { useState, useContext, createContext, useEffect } from "react";
import { useToast } from "./useToast";
import { AuthService } from "../services/Auth";
import { Cookie } from '../storage/Cookie'
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext({
  user: {},
  handleLogin: async (username, pass) => {},
  handleRegister: async(name, pass, email, cpf) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const  addToast  = useToast();
  const { login, register } = AuthService();

  useEffect(() => {
    const storageToken = token || Cookie.getCookie("user") || localStorage.getItem("user");
    if (storageToken) {
      setUser(decodeToken(storageToken));
      //get user info from token
    }
  }, [token]);

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Token inválido: ", error);
      return null; 
    }
  };

  const handleLogin = async (username, pass) => {
    if (!username || !pass) {
      addToast("Insira os campos corretamente!", "fail");
      return;
    }
    try {
      const response = await login(username, pass);
      if (response && response.token) {
        Cookie.setCookie("user", response.token, 1);
        setToken(response.token);
        addToast("Login bem-sucedido!", "success");
      } else {
        if(response.response.error) addToast(response.response.data, "fail");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      addToast("Erro ao fazer login! Tente novamente.", "fail");
    }
  };

  const handleRegister = async (name, pass, email, cpf) => {
    if (!name || !pass || !email || !cpf) {
      addToast("Insira os campos corretamente!", "fail");
      return;
    }
    try {
      
      const response = await register(name, email, pass, cpf);
      if (response) {
        console.log(response);
        addToast(response.data, !response.error ? "fail" : "success");
      }
    } catch (error) {
     
      addToast("Erro ao fazer registro! Tente novamente.", "fail");
    }
  };

  const handleLogout = () => {
    Cookie.eraseCookie("user");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    addToast("Logout bem-sucedido!", "success");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Need AuthProvider!");
  }

  return context;
};
