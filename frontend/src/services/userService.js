import { apiRequest } from './api';

export const getPurchaseHistory = (token) => apiRequest('/user/purchases', 'GET', null, token);
export const getSubscription = (token) => apiRequest('/user/subscription', 'GET', null, token);
export const updateSubscription = (data, token) => apiRequest('/user/subscription', 'PUT', data, token);
export const getAllUsers = (token) => apiRequest('/admin/users', 'GET', null, token);
export const updateUserRole = (userId, isAdmin, token) => apiRequest('/admin/user/role', 'PUT', { userId, isAdmin }, token);
export const getAllPurchases = (token) => apiRequest('/admin/purchases', 'GET', null, token);
export const getAllSubscriptions = (token) => apiRequest('/admin/subscriptions', 'GET', null, token); 