import api from "./API";

export const GenericService = (route, token = "") => {
  const validateId = (id) => {
    return id ? null : { status: false, data: "ID não fornecido." };
  };

  const makeRequest = async (
    method,
    endpoint,
    body = null,
    headers = {},
    auth = token
  ) => {
    return await api[method](endpoint, body, headers, auth);
  };

  return {
    route,

    GetAll: async (headers = {}, auth = token) => {
      return await makeRequest("GET", `/${route}`, null, headers, auth);
    },

    GetFromId: async (id, headers = {}, auth = token) => {
      const idValidation = validateId(id);
      if (idValidation) return idValidation;
      return await makeRequest("GET", `/${route}/${id}`, null, headers, auth);
    },

    Create: async (body, headers = {}, auth = token) => {
      return await makeRequest("POST", `/${route}`, body, headers, auth);
    },

    Update: async (id, body, headers = {}, auth = token) => {
      const idValidation = validateId(id);
      if (idValidation) return idValidation;
      return await makeRequest("PUT", `/${route}/${id}`, body, headers, auth);
    },

    Delete: async (id, headers = {}, auth = token) => {
      const idValidation = validateId(id);
      if (idValidation) return idValidation;
      return await makeRequest(
        "DELETE",
        `/${route}/${id}`,
        null,
        headers,
        auth
      );
    },

    Api: () => ({
      GET: async (url, headers = {}, auth = token) => {
        
        return await makeRequest(
          "GET",
          `/${route}/${url}`,
          null,
          headers,
          auth
        );
      },
      POST: async (url, body, headers = {}, auth = token) => {
        return await makeRequest(
          "POST",
          `/${route}/${url}`,
          body,
          headers,
          auth
        );
      },
      PUT: async (url, body, headers = {}, auth = token) => {
        return await makeRequest(
          "PUT",
          `/${route}/${url}`,
          body,
          headers,
          auth
        );
      },
      DELETE: async (url, headers = {}, auth = token) => {
        return await makeRequest(
          "DELETE",
          `/${route}/${url}`,
          null,
          headers,
          auth
        );
      },
    }),
  };
};
