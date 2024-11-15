import React, { useState, useEffect } from 'react';
import apiClient from './util/apiClient';
import './LikePost.css';
import axios from "axios";

const LikePost = ({ postId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem('jwtToken') != null) {
                    const likeStatusResponse = await apiClient.get(`/post/isLiked?postId=${postId}`);
                    setIsLiked(likeStatusResponse.data);
                } else {
                    setIsLiked(false);
                }

                const likesCountResponse = await axios.get(`http://localhost:8080/api/post/getLikes?postId=${postId}`);
                setLikesCount(likesCountResponse.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setLoading(false);
            }
        };

        fetchData();
    }, [postId]);

    const handleLikeToggle = async () => {
        try {
            if (isLiked) {
                await apiClient.post(`/post/unlike?postId=${postId}`, {});
            } else {
                await apiClient.post(`/post/like?postId=${postId}`, {});
            }
            setIsLiked(!isLiked);

            setLikesCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
        } catch (err) {
            console.error('Error toggling like:', err);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <i
            className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}
            onClick={handleLikeToggle}
            style={{ cursor: 'pointer' }}
        > {likesCount}</i>
    );
};

export default LikePost;
