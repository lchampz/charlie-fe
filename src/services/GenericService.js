import api from "./API";

export const GenericService = (route) => {
  const checkId = (id) => {
    if (!id) {
      return { status: false, data: "ID não fornecido." };
    }
    return null;
  };

  return {
    GetAll: (headers = {}, auth = "") => {
      return api.GET(`/${route}`, headers, auth);
    },
    
    GetFromId: async (id, headers = {}, auth = "") => {
      const error = checkId(id);
      if (error) return error;
      return api.GET(`/${route}/${id}`, headers, auth);
    },
    
    Create: (body, headers = {}, auth = "") => {
      return api.POST(`/${route}`, body, headers, auth);
    },
    
    Update: async (id, body, headers = {}, auth = "") => {
      const error = checkId(id);
      if (error) return error;
      return api.PUT(`/${route}/${id}`, body, headers, auth);
    },

    Delete: async (id, headers = {}, auth = "") => {
      const error = checkId(id);
      if (error) return error;
      return api.DELETE(`/${route}/${id}`, headers, auth);
    },

    Api: () => ({
      GET: (url) => api.GET(`/${route}/${url}`),
      POST: (url, body, headers = {}, auth = "") => api.POST(`/${route}/${url}`, body, headers, auth),
      PUT: (url, body, headers = {}, auth = "") => api.PUT(`/${route}/${url}`, body, headers, auth),
      DELETE: (url, headers = {}, auth = "") => api.DELETE(`/${route}/${url}`, headers, auth)
    }),
  };
};
