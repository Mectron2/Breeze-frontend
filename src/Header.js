import React, { useState, useEffect } from 'react';
import './Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { isAuthenticated, logout } from './util/authClient';
import AuthModal from "./AuthModal";
import AddPost from "./AddPost";
import { useNavigate } from 'react-router-dom';
import './AddPost.css';
import UserAvatar from "./UserAvatar";
import apiClient from "./util/apiClient";

const Header = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        setAuthenticated(false);
    };

    const fetchCurrentUser = async () => {
        const checkAuth = isAuthenticated();
        setAuthenticated(checkAuth);

        if (checkAuth) {
            try {
                const response = await apiClient.get("/user/WhoAmI");
                const userData = response.data;
                setCurrentUser(userData);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        }
    };

    useEffect(() => {
        const checkAuth = isAuthenticated();
        setAuthenticated(checkAuth);
        fetchCurrentUser()
        }, []);

    return (
        <div className="header">
            <div className="logo bi fs-4" onClick={() => navigate(`/`)}>B</div>
            <div className="buttons">
                <nav className="navButtons">
                    <i className="bi bi-house-fill fs-4" onClick={() => navigate(`/`)}></i>
                    {authenticated ? (<AddPost />) : null}
                    <i className="bi bi-search fs-4" onClick={() => navigate(`/search`)}></i>
                    {authenticated ? (
                        <i
                            className="bi bi-box-arrow-right fs-4"
                            onClick={handleLogoutClick}
                            title="Logout"
                        ></i>
                    ) : null}
                </nav>
            </div>
            {authenticated && currentUser ? (
                <UserAvatar userId={currentUser.id} imagePath={currentUser.profileImagePath} username={currentUser.username} dontDisplayNickname={true}/>
            ) : (
                <AuthModal />
            )}
        </div>
    );
};

export default Header;
