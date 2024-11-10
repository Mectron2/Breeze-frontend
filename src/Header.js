import React, { useState } from 'react';
import './Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { isAuthenticated, logout } from './util/authClient';
import AuthModal from "./AuthModal";

const Header = () => {

    const handleLogoutClick = () => {
        logout();
        alert('You have successfully logged out');
    };

    return (
        <div className="header">
            <div className="logo bi fs-4">B</div>
            <div className="buttons">
                <nav className="navButtons">
                    <i className="bi bi-house-fill fs-4"></i>
                    <i className="bi bi-plus-square-fill fs-4"></i>
                    <i className="bi bi-search fs-4"></i>
                    {isAuthenticated() ? (
                        <i
                            className="bi bi-box-arrow-right fs-4"
                            onClick={handleLogoutClick}
                            title="Logout"
                        ></i>
                    ) : (
                        <AuthModal/>
                    )}
                </nav>
            </div>
            <i className="bi bi-grid-fill fs-4"></i>
        </div>
    );
};

export default Header;
