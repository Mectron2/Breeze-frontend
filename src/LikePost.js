import React, { useState, useEffect } from 'react';
import apiClient from './util/apiClient';

const LikePost = ({ postId }) => {
    const [isLiked, setIsLiked] = useState(false);  // Храним информацию о лайке
    const [loading, setLoading] = useState(true);  // Индикатор загрузки
    const [likesCount, setLikesCount] = useState(0);

    // Загружаем статус лайка и количество лайков при монтировании компонента
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Проверяем, лайкнут ли пост
                const likeStatusResponse = await apiClient.get(`/post/isLiked?postId=${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Получаем токен из хранилища
                    }
                });
                setIsLiked(likeStatusResponse.data);  // Обновляем состояние лайка

                // Получаем количество лайков
                const likesCountResponse = await apiClient.get(`/post/getLikes?postId=${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Получаем токен из хранилища
                    }
                });
                setLikesCount(likesCountResponse.data);  // Обновляем количество лайков

                setLoading(false);  // Отключаем индикатор загрузки
            } catch (err) {
                console.error('Error fetching data:', err);
                setLoading(false);  // Даже при ошибке выключаем загрузку
            }
        };

        fetchData();  // Запуск функции при монтировании компонента
    }, [postId]);  // Перезапускать при изменении postId

    const handleLikeToggle = async () => {
        try {
            if (isLiked) {
                // Если уже лайкнут, нужно сделать запрос на удаление лайка
                await apiClient.post(`/post/unlike?postId=${postId}`, {});
            } else {
                // Если не лайкнут, делаем запрос на лайк
                await apiClient.post(`/post/like?postId=${postId}`, {});
            }
            setIsLiked(!isLiked);  // Переключаем статус лайка

            // Обновляем количество лайков
            setLikesCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
        } catch (err) {
            console.error('Error toggling like:', err);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <i
                className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}
                onClick={handleLikeToggle}
                style={{ cursor: 'pointer' }}
            ></i>
            <p>{likesCount} Likes</p>
        </div>
    );
};

export default LikePost;