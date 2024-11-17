// src/components/LikePost.jsx
import React, { useState, useEffect, useContext } from 'react';
import apiClient from '../util/apiClient';
import '../stylesheets/LikePost.css';
import { AuthContext } from '../context/AuthContext';

const LikePost = ({ postId, initialIsLiked, initialLikesCount }) => {
    const { authenticated, handleLogout } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likesCount, setLikesCount] = useState(initialLikesCount);

    const handleLikeToggle = async () => {
        if (!authenticated) {
            return;
        }

        try {
            if (isLiked) {
                setIsLiked(false);
                setLikesCount(prevCount => prevCount - 1);
                await apiClient.post(`/post/unlike?postId=${postId}`, {});
            } else {
                setIsLiked(true);
                setLikesCount(prevCount => prevCount + 1);
                await apiClient.post(`/post/like?postId=${postId}`, {});
            }
        } catch (err) {
            console.warn("Session has expired.");
            handleLogout();
        }
    };

    return (
        <i
            className={`bi ${isLiked ? 'bi-heart-fill liked' : 'bi-heart'}`}
            onClick={handleLikeToggle}
            style={{ cursor: authenticated ? 'pointer' : 'not-allowed', color: isLiked ? 'red' : 'black' }}
            title={authenticated ? (isLiked ? 'Unlike' : 'Like') : 'Sign in to like it'}
        >
            {' '}{likesCount}
        </i>
    );
};

export default LikePost;