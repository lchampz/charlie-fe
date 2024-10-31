import api from "./API";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";


export const GenericService = (route) => {
  const { token } = useAuth();
  const checkId = (id) =>
    !id ? { status: false, data: "ID não fornecido." } : null;
  const { setLoading } = useLoading();

  return {
    route: route,

    GetAll: async (headers = {}, auth = token) => {
      try {
        setLoading(true);
        const response = await api.GET(`/${route}`, headers, auth);
        return response;
      } finally {
        setLoading(false);
      }
    },

    GetFromId: async (id, headers = {}, auth = token) => {
      const response = checkId(id);
      if (response) return response;
      try {
        setLoading(true);
        const response = await api.GET(`/${route}/${id}`, headers, auth);
        return response;
      } finally {
        setLoading(false);
      }
    },

    Create: async (body, headers = {}, auth = token) => {
      try {
        setLoading(true);
        const response = await api.POST(`/${route}`, body, headers, auth);
        return response;
      } finally {
        setLoading(false);
      }
    },

    Update: async (id, body, headers = {}, auth = token) => {
      const response = checkId(id);
      if (response) return response;
      try {
        setLoading(true);
        const response = await api.PUT(`/${route}/${id}`, body, headers, auth);
        return response;
      } finally {
        setLoading(false);
      }
    },

    Delete: async (id, headers = {}, auth = token) => {
      const response = checkId(id);
      if (response) return response;
      try {
        setLoading(true);
        const response = await api.DELETE(`/${route}/${id}`, headers, auth);
        return response;
      } finally {
        setLoading(false);
      }
    },

    Api: () => ({
      GET: async (url, auth = token) => {
        try {
          setLoading(true);
          const response = await api.GET(`/${route}/${url}`, {auth: auth});
          return response;
        } finally {
          setLoading(false);
        }
      },
      POST: async (url, body, headers = {}, auth = token) => {
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
      PUT: async (url, body, headers = {}, auth = token) => {
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
      DELETE: async (url, headers = {}, auth = token) => {
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
