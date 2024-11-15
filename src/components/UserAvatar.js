import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/UserAvatar.css';

const UserAvatar = ({ username, imagePath, userId, dontDisplayNickname }) => {
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate(`/user/${username}`);
    };

    return (
        <div className="userAvatar" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
            <img src={imagePath} alt={`${username}'s avatar`} className="userAvatarImage" />
            {!dontDisplayNickname && (<span className="userAvatarName">{username}</span>)}
        </div>
    );
};

export default UserAvatar;
