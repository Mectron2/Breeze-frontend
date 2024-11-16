import React, { useState, useEffect, useContext } from 'react';
import '../stylesheets/Post.css';
import PostsList from '../components/PostsList';
import { AuthContext } from "../context/AuthContext";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authenticated, isAuthReady } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthReady) return; // Ждём, пока контекст завершит проверку

        const fetchPosts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:8080/api/posts', {
                    method: 'GET',
                    headers: authenticated
                        ? {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                        }
                        : { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error('Error: ' + response.statusText);
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
    }, [authenticated, isAuthReady]); // Добавляем isAuthReady в зависимости

    if (!isAuthReady) {
        return <div>Loading authentication...</div>;
    }

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div className="container">
            <PostsList posts={posts} setPosts={setPosts} />
        </div>
    );
};

export default PostList;
