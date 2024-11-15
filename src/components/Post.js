import React, { useState, useEffect } from 'react';
import '../stylesheets/Post.css';
import PostsList from '../components/PostsList';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8080/api/posts');
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.statusText);
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Загрузка постов...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Ошибка: {error}</div>;
    }

    return (
        <div className="container">
            <PostsList posts={posts} />
        </div>
    );
};

export default PostList;