import api from './axiosConfig';

export const registerUser = async (data) => {
  try {
    const res = await api.post('/auth/register', data);
    return { ok: true, ...res.data };
  } catch (error) {
    const resp = error.response?.data || {};
    return { ok: false, message: resp.message || 'Error de conexión', errors: resp.errors || null };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post('/auth/login', data);
    return { ok: true, ...res.data };
  } catch (error) {
    const resp = error.response?.data || {};
    return { ok: false, message: resp.message || 'Error de conexión', errors: resp.errors || null };
  }
};
