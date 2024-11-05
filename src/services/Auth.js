import api from './API'
import { useLoading } from "../hooks/useLoading";

export const AuthService = () => {
  const { setLoading } = useLoading();
  
  return {
    login: async (email = "", pass = "") => {
      try {
        const body = { email, pass };
        setLoading(true);
        const response =  await api.POST("/auth/signIn", body);
        return response;
      } finally {
        setLoading(false);
      }
    },
    register: async (name, email, pass, cpf) => {
        try {
            const body = { name, email, pass, cpf }; 
           
            setLoading(true);
            const response =  await api.POST("/auth/signUp", body);
            return response;
          } finally {
            setLoading(false);
          }
    },
    getInfoByToken: async (token) => {
      try {
        setLoading(true);
        const response =  await api.GET("/usuario", null, {}, token);
        return response;
      } finally {
        setLoading(false);
      }
    }
  };
};
