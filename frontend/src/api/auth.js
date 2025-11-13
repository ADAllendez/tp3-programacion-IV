import api from "./axiosConfig";

export async function registerUser(data) {
  try {
    console.log("Datos enviados al registro:", data);
  const res = await api.post("/auth/register", data);
    return { ok: true, ...res.data };
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    // Si el backend devuelve validaciones (express-validator) vienen en error.response.data.errors
    const serverErrors = error.response?.data?.errors;
    if (serverErrors && Array.isArray(serverErrors)) {
      // concatenar mensajes de validación
      const message = serverErrors.map((e) => e.msg).join('. ');
      return { ok: false, message };
    }
    return {
      ok: false,
      message: error.response?.data?.message || "Error de conexión con el servidor",
    };
  }
}

export async function loginUser(data) {
  try {
  const res = await api.post("/auth/login", data);
    return { ok: true, ...res.data };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    console.error("Detalles del error de Axios:", error.response);
    return {
      ok: false,
      message: error.response?.data?.message || "Error de conexión con el servidor",
    };
  }
}
