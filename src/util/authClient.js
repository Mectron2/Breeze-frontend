import apiClient from './apiClient';

const TOKEN_KEY = 'jwtToken';

export const isAuthenticated = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
    }
    return false;
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    delete apiClient.defaults.headers.common['Authorization'];
    window.location.reload();
};
