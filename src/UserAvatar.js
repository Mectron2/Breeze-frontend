import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserAvatar.css';

const UserAvatar = ({ username, imagePath, userId }) => {
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate(`/user/${userId}`);
    };

    return (
        <div className="userAvatar" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
            <img src={imagePath} alt={`${username}'s avatar`} className="userAvatarImage" />
            <span className="userAvatarName">{username}</span>
        </div>
    );
};

export default UserAvatar;
