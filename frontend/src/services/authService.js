import { apiRequest } from './api';

export const signup = (data) => apiRequest('/auth/signup', 'POST', data);
export const login = (data) => apiRequest('/auth/login', 'POST', data);
export const updateProfile = (data, token) => apiRequest('/auth/profile', 'PUT', data, token); 