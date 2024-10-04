import { GenericService } from "./GenericService";

export const ProductService = () => {
  const service = GenericService("produtos");

  return {
    ...service,
    GetActiveProducts: async () => {
      return await service.Api().GET(`ativo`);
    },
    GetActiveProductsFromId: async (id) => {
      if(!id) return {status: false, data: "ID não fornecido."};
      return await service.Api().GET(`ativo/${id}`);
    }
  };
}
