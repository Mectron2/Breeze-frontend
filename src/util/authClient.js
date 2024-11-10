// auth.js
import apiClient from './apiClient';

const TOKEN_KEY = 'jwtToken';

// Функция для входа (авторизации)
export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/login', credentials);
        const token = response.data.accessToken;
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return token;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Функция проверки, залогинен ли пользователь
export const isAuthenticated = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
    }
    return false;
};

// Функция выхода из аккаунта
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    delete apiClient.defaults.headers.common['Authorization'];
    // Убираем перезагрузку страницы
};
