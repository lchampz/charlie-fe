import api from "./API";
import { useLoading } from "../hooks/useLoading";


export const GenericService = (route) => {
  const checkId = (id) =>
    !id ? { status: false, data: "ID não fornecido." } : null;
  const { setLoading } = useLoading();

  return {
    route: route,

    GetAll: async (headers = {}, auth = "") => {
      try {
        setLoading(true);
        const response = await api.GET(`/${route}`, headers, auth);
        return response;
      } finally {
        setLoading(false);
      }
    },

    GetFromId: async (id, headers = {}, auth = "") => {
      const error = checkId(id);
      if (error) return error;
      try {
        setLoading(true);
        const response = await api.GET(`/${route}/${id}`, headers, auth);
        return response;
      } finally {
        setLoading(false);
      }
    },

    Create: async (body, headers = {}, auth = "") => {
      try {
        setLoading(true);
        const response = await api.POST(`/${route}`, body, headers, auth);
        return response;
      } finally {
        setLoading(false);
      }
    },

    Update: async (id, body, headers = {}, auth = "") => {
      const error = checkId(id);
      if (error) return error;
      try {
        setLoading(true);
        const response = await api.PUT(`/${route}/${id}`, body, headers, auth);
        return response;
      } finally {
        setLoading(false);
      }
    },

    Delete: async (id, headers = {}, auth = "") => {
      const error = checkId(id);
      if (error) return error;
      try {
        setLoading(true);
        const response = await api.DELETE(`/${route}/${id}`, headers, auth);
        return response;
      } finally {
        setLoading(false);
      }
    },

    Api: () => ({
      GET: async (url, auth) => {
        try {
          setLoading(true);
          const response = await api.GET(`/${route}/${url}`, {auth: auth});
          return response;
        } finally {
          setLoading(false);
        }
      },
      POST: async (url, body, headers = {}, auth = "") => {
        try {
          setLoading(true);
          const response = await api.POST(
            `/${route}/${url}`,
            body,
            headers,
            auth
          );
          return response;
        } finally {
          setLoading(false);
        }
      },
      PUT: async (url, body, headers = {}, auth = "") => {
        try {
          setLoading(true);
          const response = await api.PUT(
            `/${route}/${url}`,
            body,
            headers,
            auth
          );
          return response;
        } finally {
          setLoading(false);
        }
      },
      DELETE: async (url, headers = {}, auth = "") => {
        try {
          setLoading(true);
          const response = await api.DELETE(`/${route}/${url}`, headers, auth);
          return response;
        } finally {
          setLoading(false);
        }
      },
    }),
  };
};
