import { GenericService } from "./GenericService";

export const ProductService = () => {
  const genericService = GenericService("produtos");

  return {
    ...genericService,
    GetActiveProducts: async () => {
      return await GenericService().Api().GET(`ativo`);
    },
    GetActiveProductsFromId: async (id) => {
      return await GenericService().Api().GET(`ativo/${id}`);
    }
  };
}
