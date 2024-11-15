import React, { useState, useEffect } from 'react';
import '../stylesheets/Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { isAuthenticated, logout } from '../util/authClient';
import AuthModal from "../components/AuthModal";
import AddPost from "../components/AddPost";
import { useNavigate } from 'react-router-dom';
import '../stylesheets/AddPost.css';
import UserAvatar from "../components/UserAvatar";
import apiClient from "../util/apiClient";

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
            <div className="logo bi fs-4" onClick={() => navigate(`/`)}>
                <svg width="50" height="50" viewBox="0 0 105.615 82.52" xmlns="http://www.w3.org/2000/svg">
                    <g id="svgGroup" stroke-linecap="round" style={{fill: "white"}} fill-rule="evenodd" font-size="9pt">
                        <path
                            d="M 103.418 51.904 L 101.221 51.904 Q 99.316 51.904 98.193 52.246 Q 96.698 57.956 91.355 63.076 A 36.834 36.834 0 0 1 90.503 63.867 A 57.658 57.658 0 0 1 82.837 69.641 A 74.65 74.65 0 0 1 75.732 73.609 A 99.207 99.207 0 0 1 62.764 78.919 A 87.423 87.423 0 0 1 58.472 80.2 A 82.897 82.897 0 0 1 52.644 81.568 Q 47.744 82.52 43.896 82.52 A 40.23 40.23 0 0 1 40.086 82.353 Q 35.251 81.891 32.813 80.152 Q 30.686 78.635 29.921 76.867 A 5.143 5.143 0 0 1 29.492 74.805 Q 29.492 70.703 36.963 66.529 Q 41.982 63.724 49.47 61.029 A 165.225 165.225 0 0 1 57.373 58.423 A 302.314 302.314 0 0 1 70.33 54.819 Q 78.14 52.822 87.012 50.928 A 9.007 9.007 0 0 0 85.869 49.112 A 5.969 5.969 0 0 0 82.935 47.119 A 12.37 12.37 0 0 0 81.364 46.778 Q 78.613 46.338 73.486 46.338 L 66.699 46.338 A 879.227 879.227 0 0 0 63.321 46.344 Q 60.054 46.357 57.683 46.395 A 211.578 211.578 0 0 0 55.713 46.436 Q 50.233 46.436 48.503 44.08 A 4.394 4.394 0 0 1 47.705 41.406 A 5.89 5.89 0 0 1 49.468 37.191 A 8.921 8.921 0 0 1 50.537 36.255 Q 53.369 34.131 59.18 31.348 A 164.883 164.883 0 0 0 64.938 28.29 Q 70.604 25.127 74.293 22.353 A 47.562 47.562 0 0 0 74.536 22.168 A 15.636 15.636 0 0 0 77.691 19.021 A 11.542 11.542 0 0 0 79.98 12.012 A 7.368 7.368 0 0 0 77.745 6.651 A 9.382 9.382 0 0 0 77.637 6.543 A 7.87 7.87 0 0 0 73.487 4.435 A 11.299 11.299 0 0 0 71.387 4.248 A 17.365 17.365 0 0 0 65.971 5.179 Q 63.64 5.944 61.135 7.337 A 42.602 42.602 0 0 0 57.129 9.888 A 80.756 80.756 0 0 0 49.649 15.969 Q 45.374 19.865 41.016 24.78 A 190.995 190.995 0 0 0 25.757 44.458 A 204.189 204.189 0 0 0 19.269 54.657 A 158.993 158.993 0 0 0 13.916 64.404 A 62.406 62.406 0 0 0 13.702 64.836 Q 13.463 65.324 13.146 65.987 A 240.455 240.455 0 0 0 12.842 66.626 A 24.86 24.86 0 0 1 12.146 67.987 A 19.165 19.165 0 0 1 11.426 69.19 A 7.747 7.747 0 0 1 10.663 70.183 A 5.868 5.868 0 0 1 9.79 70.972 A 3.429 3.429 0 0 1 7.715 71.631 A 3.566 3.566 0 0 1 5.401 70.777 A 5.002 5.002 0 0 1 4.932 70.337 A 20.086 20.086 0 0 1 3.996 69.265 Q 3.523 68.686 3.013 67.993 A 45.4 45.4 0 0 1 2.197 66.846 A 41.764 41.764 0 0 1 1.613 65.898 Q 1.001 64.875 0.654 64.131 A 9.008 9.008 0 0 1 0.464 63.696 A 5.133 5.133 0 0 1 0.209 62.836 Q 0.029 61.984 0.004 60.798 A 18.618 18.618 0 0 1 0 60.401 A 13.987 13.987 0 0 1 0.708 56.086 A 18.162 18.162 0 0 1 1.685 53.687 A 30.715 30.715 0 0 1 3.974 49.799 A 39.955 39.955 0 0 1 6.299 46.753 A 102.49 102.49 0 0 1 8.431 44.289 Q 9.615 42.966 10.713 41.846 A 55.625 55.625 0 0 1 11.694 40.869 A 266.381 266.381 0 0 1 13.162 39.458 Q 15.451 37.271 19.445 33.523 A 2314.831 2314.831 0 0 1 20.41 32.617 A 40.395 40.395 0 0 0 23.032 26.512 A 49.054 49.054 0 0 0 24.023 23.194 Q 25.242 18.535 25.375 14.731 A 26.287 26.287 0 0 0 25.391 13.819 A 13.254 13.254 0 0 0 24.759 9.625 A 10.703 10.703 0 0 0 20.898 4.346 A 7.394 7.394 0 0 1 20.312 3.81 Q 19.735 3.216 19.559 2.692 A 1.399 1.399 0 0 1 19.482 2.246 A 1.711 1.711 0 0 1 19.683 1.719 Q 19.966 1.254 20.548 1.152 A 2.033 2.033 0 0 1 20.898 1.123 A 3.168 3.168 0 0 1 22.005 1.342 Q 23.125 1.761 24.487 2.979 Q 26.4 4.689 27.795 7.603 A 21.869 21.869 0 0 1 28.027 8.106 A 16.932 16.932 0 0 1 29.432 13.754 A 20.303 20.303 0 0 1 29.492 15.332 A 34.187 34.187 0 0 1 27.881 25.733 A 370.616 370.616 0 0 1 37.725 18.074 Q 46.857 11.23 53.811 7.111 A 98.592 98.592 0 0 1 55.42 6.177 Q 66.309 0 74.805 0 A 19.957 19.957 0 0 1 77.86 0.222 Q 79.949 0.546 81.616 1.343 A 11.24 11.24 0 0 1 84.015 2.867 A 9.01 9.01 0 0 1 85.864 4.981 Q 87.305 7.276 87.305 9.912 A 11.576 11.576 0 0 1 85.725 15.708 A 14.406 14.406 0 0 1 85.156 16.626 A 23.852 23.852 0 0 1 82.097 20.286 A 30.91 30.91 0 0 1 79.419 22.632 A 98.516 98.516 0 0 1 77.288 24.256 Q 75.067 25.897 73.389 26.904 Q 71.394 28.101 66.142 31.155 A 2809.612 2809.612 0 0 1 63.623 32.617 A 209.385 209.385 0 0 1 71.243 32.748 Q 74.871 32.88 78.011 33.147 A 97.526 97.526 0 0 1 81.836 33.545 A 36.664 36.664 0 0 1 87.455 34.674 Q 90.607 35.583 93.157 37.042 A 21.701 21.701 0 0 1 94.189 37.671 A 10.244 10.244 0 0 1 98.975 45.061 A 14.048 14.048 0 0 1 99.121 47.119 A 9.626 9.626 0 0 1 99.081 47.969 Q 99.04 48.425 98.959 48.937 A 18.665 18.665 0 0 1 98.877 49.414 A 64.582 64.582 0 0 1 99.847 49.329 Q 100.899 49.245 101.66 49.225 A 17.02 17.02 0 0 1 102.1 49.219 Q 105.1 49.219 105.54 50.322 A 1.1 1.1 0 0 1 105.615 50.733 Q 105.615 51.808 103.767 51.896 A 7.262 7.262 0 0 1 103.418 51.904 Z M 87.598 53.418 A 313.868 313.868 0 0 0 75.141 56.247 A 259.191 259.191 0 0 0 68.188 58.081 A 184.412 184.412 0 0 0 60.736 60.324 Q 57.068 61.517 53.868 62.756 A 106.26 106.26 0 0 0 52.417 63.33 A 71.037 71.037 0 0 0 48.491 65.049 Q 44.502 66.95 41.968 68.897 Q 38.281 71.729 38.281 74.707 Q 38.281 76.505 40.07 77.867 A 7.09 7.09 0 0 0 40.088 77.881 A 5.557 5.557 0 0 0 41.648 78.684 Q 43.127 79.192 45.309 79.243 A 21.192 21.192 0 0 0 45.801 79.248 A 30.62 30.62 0 0 0 50.431 78.869 Q 54.039 78.316 58.301 76.953 A 73.804 73.804 0 0 0 72.241 70.825 A 55.553 55.553 0 0 0 78.039 67.071 Q 80.925 64.922 83.157 62.578 A 34.369 34.369 0 0 0 83.301 62.427 Q 87.598 57.862 87.598 53.418 Z"
                            vector-effect="non-scaling-stroke"/>
                    </g>
                </svg>
            </div>
            <div className="buttons">
                <nav className="navButtons">
                    <i className="bi bi-house-fill fs-4" onClick={() => navigate(`/`)}></i>
                    {authenticated ? (<AddPost/>) : null}
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
                <UserAvatar userId={currentUser.id} imagePath={currentUser.profileImagePath}
                            username={currentUser.username} dontDisplayNickname={true}/>
            ) : (
                <AuthModal/>
            )}
        </div>
    );
};

export default Header;
