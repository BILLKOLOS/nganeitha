import { apiRequest } from './api';

export const getEbooks = () => apiRequest('/ebooks');
export const getEbookById = (id) => apiRequest(`/ebooks/${id}`);
export const createEbook = (data, token) => apiRequest('/ebooks', 'POST', data, token);
export const updateEbook = (id, data, token) => apiRequest(`/ebooks/${id}`, 'PUT', data, token);
export const deleteEbook = (id, token) => apiRequest(`/ebooks/${id}`, 'DELETE', null, token); 