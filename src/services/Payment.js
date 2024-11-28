import { useLoading } from "../hooks/useLoading";
import api from "./API";

export const PaymentService = () => {
  const { setLoading } = useLoading();

  return {
    Pay: async (body, token) => {
      try {
        setLoading(true);
        const response = await api.POST("/pagamento", body, {}, token);
        return response;
      } finally {
        setLoading(false);
      }
    }
  };
};
