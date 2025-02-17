import axios from 'axios';

const api = axios.create({
    baseURL: 'https://a695-31-134-118-93.ngrok-free.app/api',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location = '/login';
        }
        return Promise.reject(error);
    }
);
// Добавляем новые методы для работы с API
export const getNetworks = () => api.get('/v1/networks');
export const getUserById = (id) => api.get(`/v1/users/${id}`);
export const getWallets = () => api.get('/v1/wallets');
export const createWallet = (data) => api.post('/v1/wallets', data);
export const editWallet = (id, data) => api.post(`/v1/wallets/${id}/edit`, data);
export const getUserPublicProfile = (userId) => api.get(`/v1/users/${userId}`);
export default api;