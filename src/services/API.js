

class API {
  constructor(base_url) {
    this.base_url = base_url;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  async request(route, method, body = null, headers = {}, auth = "") {
    const url = this.base_url + route;
    const options = {
      method,
      headers: { ...this.defaultHeaders, ...headers },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    if (auth) {
      options.headers['Authorization'] = `Bearer ${auth}`;
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) { 
        throw new Error(`${data.data || "Erro desconhecido."}`);
      }
      
      return data;
    } catch (error) {
      console.error(`Erro na requisição ${method} para ${url}: ${error.message}`);
      return { data: error.message };
    }
  }

  GET(route, body=null, headers = {}, auth = "") {
    return this.request(route, "GET", body, headers, auth);
  }

  POST(route, body, headers = {}, auth = "") {
    return this.request(route, "POST", body, headers, auth);
  }

  PUT(route, body, headers = {}, auth = "") {
    return this.request(route, "PUT", body, headers, auth);
  }

  DELETE(route,body= null, headers = {}, auth = "") {
    return this.request(route, "DELETE", body, headers, auth);
  }
}

const api = new API("http://127.0.0.1:8000/api");

export default api;