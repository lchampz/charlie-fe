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
    UpdateAddress: async (body, token) => {
      try {
        setLoading(true);
        const response = await api.POST("/endereco/update", body, {}, token);
        return response;
      } finally {
        setLoading(false);
      }
    },
    CreateAddress: async (body, token) => {
      try {
        setLoading(true);
        const response = await api.POST("/endereco", body, {}, token);
        return response;
      } finally {
        setLoading(false);
      }
    },
    DeleteAddress: async (id, token) => {
      try {
        setLoading(true);
        const response = await api.DELETE(`/endereco/${id}`, null, {}, token);
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
    GetOrders: async (token) => {
      try {
        setLoading(true);
        const response = await api.GET("/pedidos", null, {}, token);
        return response;
      } finally {
        setLoading(false);
      }
    },
  };
};
