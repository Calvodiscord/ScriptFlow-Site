import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        req.headers['x-auth-token'] = localStorage.getItem('token');
    }
    return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Funções do Admin
export const getAllUsers = () => API.get('/users');
export const banUser = (id) => API.put(`/users/ban/${id}`);
export const unbanUser = (id) => API.put(`/users/unban/${id}`);
