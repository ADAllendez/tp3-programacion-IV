import axios from "axios";

const api = axios.create({
  // Apuntar al backend local (puerto 4000) y asegurar la barra final para concatenaciones
  baseURL: "http://localhost:4000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;