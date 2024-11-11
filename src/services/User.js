import { useLoading } from "../hooks/useLoading";
import api from "./API";

export const UserService = () => {
  const { setLoading } = useLoading();

  return {
    UpdateUser: async (body, token) => {
      try {
        setLoading(true);
        const response = await api.POST("/usuario", body, {}, token);
        return response;
      } finally {
        setLoading(false);
      }
    },
    GetAddress: async (token) => {
      try {
        setLoading(true);
        const response = await api.GET("/endereco", null, {}, token);
        return response;
      } finally {
        setLoading(false);
      }
    },
  };
};
