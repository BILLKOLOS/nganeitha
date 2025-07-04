import { apiRequest } from './api';

export const getBlogs = () => apiRequest('/blogs');
export const getBlogById = (id) => apiRequest(`/blogs/${id}`);
export const createBlog = (data, token) => apiRequest('/blogs', 'POST', data, token);
export const updateBlog = (id, data, token) => apiRequest(`/blogs/${id}`, 'PUT', data, token);
export const deleteBlog = (id, token) => apiRequest(`/blogs/${id}`, 'DELETE', null, token); 