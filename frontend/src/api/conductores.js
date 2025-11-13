import api from './axiosConfig';
export const getConductores = () => api.get('/conductores');
export const getConductor = (id) => api.get(`/conductores/${id}`);
export const createConductor = (data) => api.post('/conductores', data);
export const updateConductor = (id, data) => api.put(`/conductores/${id}`, data);
export const deleteConductor = (id) => api.delete(`/conductores/${id}`);
export const getKmPorConductor = (id) => api.get(`/viajes/km/conductor/${id}`);
