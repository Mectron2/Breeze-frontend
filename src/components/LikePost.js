// src/components/LikePost.jsx
import React, { useState, useEffect, useContext } from 'react';
import apiClient from '../util/apiClient';
import '../stylesheets/LikePost.css';
import { AuthContext } from '../context/AuthContext';

const LikePost = ({ postId }) => {
    const { authenticated, handleLogout } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [likesCount, setLikesCount] = useState(0);
    // eslint-disable-next-line
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLikeData = async () => {
            if (!authenticated) {
                setIsLiked(false);
                try {
                    const likesCountResponse = await apiClient.get(`/post/getLikes?postId=${postId}`);
                    setLikesCount(likesCountResponse.data);
                } catch (err) {
                    console.error('Error fetching likes count:', err);
                    setError('Не удалось загрузить количество лайков.');
                }
                setLoading(false);
                return;
            }

            try {
                const likeStatusResponse = await apiClient.get(`/post/isLiked?postId=${postId}`);
                setIsLiked(likeStatusResponse.data);

                const likesCountResponse = await apiClient.get(`/post/getLikes?postId=${postId}`);
                setLikesCount(likesCountResponse.data);
                setLoading(false);
            } catch (err) {
                console.warn("Сессия истекла. Выполняется выход пользователя.");
                handleLogout();
            }
        };

        fetchLikeData();
    }, [postId, authenticated, handleLogout]);

    const handleLikeToggle = async () => {
        if (!authenticated) {
            alert('Пожалуйста, войдите в систему, чтобы поставить лайк.');
            return;
        }

        try {
            if (isLiked) {
                await apiClient.post(`/post/unlike?postId=${postId}`, {});
                setIsLiked(false);
                setLikesCount(prevCount => prevCount - 1);
            } else {
                await apiClient.post(`/post/like?postId=${postId}`, {});
                setIsLiked(true);
                setLikesCount(prevCount => prevCount + 1);
            }
        } catch (err) {
            console.warn("Session has expired.");
            handleLogout();
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
            <i
                className={`bi ${isLiked ? 'bi-heart-fill liked' : 'bi-heart'}`}
                onClick={handleLikeToggle}
                style={{ cursor: authenticated ? 'pointer' : 'not-allowed', color: isLiked ? 'red' : 'black' }}
                title={authenticated ? (isLiked ? 'Нравится' : 'Нравится') : 'Войдите, чтобы поставить лайк'}
            > {likesCount}</i>
    );
};

export default LikePost;