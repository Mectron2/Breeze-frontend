import axios from 'axios';

// Создаем экземпляр axios с базовой настройкой
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Добавляем токен в заголовки всех запросов
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
