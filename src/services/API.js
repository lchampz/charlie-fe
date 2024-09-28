class API {
  constructor(base_url) {
    this.base_url = base_url;
  }
  async GET(route) {
    try {
      const response = await fetch(this.base_url + route, {
        method: "GET"
      });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      return { status: true, data: await response.json() };
    } catch (error) {
      return { status: false, data: error.message };
    }
  }

  async POST(route, body, auth = "") {
    try {
      const response = await fetch(this.base_url + route, {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      return { status: true, data: await response.json() };
    } catch (error) {
      return { status: false, data: error.message };
    }
  }

  async PUT(route, body, auth = "") {
    try {
      const response = await fetch(this.base_url + route, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      return { status: true, data: await response.json() };
    } catch (error) {
      return { status: false, data: error.message };
    }
  }

  async DELETE(route, auth) {
    try {
      const response = await fetch(this.base_url + route, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      return { status: true, data: await response.json() };
    } catch (error) {
      return { status: false, data: error.message };
    }
  }
}

const api = new API("https://rickandmortyapi.com/api");

export default api;
