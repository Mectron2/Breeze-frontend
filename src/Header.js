import React, { useState, useEffect } from 'react';
import './Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { isAuthenticated, logout } from './util/authClient';
import AuthModal from "./AuthModal";
import AddPost from "./AddPost";
import './AddPost.css';

const Header = () => {
    const [authenticated, setAuthenticated] = useState(false);

    // Обработчик клика на выход
    const handleLogoutClick = () => {
        logout();  // Вызываем logout без перезагрузки страницы
        setAuthenticated(false);  // Обновляем состояние сразу
    };

    // Проверка состояния авторизации при монтировании компонента
    useEffect(() => {
        const checkAuth = isAuthenticated(); // Получаем актуальный статус авторизации
        setAuthenticated(checkAuth);  // Обновляем состояние компонента
    }, []);  // Выполняется один раз при монтировании компонента

    // Функция для обновления состояния авторизации из AuthModal
    const handleAuthChange = (status) => {
        setAuthenticated(status);  // Обновляем состояние на основе успеха авторизации
    };

    return (
        <div className="header">
            <div className="logo bi fs-4">B</div>
            <div className="buttons">
                <nav className="navButtons">
                    <i className="bi bi-house-fill fs-4"></i>
                    {authenticated ? (<AddPost />) : null}
                    <i className="bi bi-search fs-4"></i>
                    {authenticated ? (
                        <i
                            className="bi bi-box-arrow-right fs-4"
                            onClick={handleLogoutClick}
                            title="Logout"
                        ></i>
                    ) : (
                        <AuthModal />
                    )}
                </nav>
            </div>
            <i className="bi bi-grid-fill fs-4"></i>
        </div>
    );
};

export default Header;
