// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { isAuthenticated, logout } from '../util/authClient';
import apiClient from '../util/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    const handleLogout = () => {
        logout();
        setAuthenticated(false);
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const fetchCurrentUser = async () => {
        const checkAuth = isAuthenticated();
        setAuthenticated(checkAuth);

        if (checkAuth) {
            try {
                const response = await apiClient.get("/user/WhoAmI");
                const userData = response.data;

                const storedUser = localStorage.getItem('currentUser');
                const parsedStoredUser = storedUser ? JSON.parse(storedUser) : null;

                if (!storedUser || JSON.stringify(parsedStoredUser) !== JSON.stringify(userData)) {
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                }

                setCurrentUser(userData);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        }
        setIsAuthReady(true); // Готово
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{authenticated, currentUser, handleLogout, isAuthReady}}>
            {children}
        </AuthContext.Provider>
    );
}