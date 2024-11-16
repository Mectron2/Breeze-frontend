import React, { useState, useEffect } from 'react';
import '../stylesheets/Post.css';
import { useParams } from 'react-router-dom';
import PostsList from '../components/PostsList';

const UserPostList = () => {
    const { username } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:8080/api/user/${username}`, {
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Error: ' + response.statusText);
                }
                const data = await response.json();
                setPosts(data.postDtoList);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [username]);

    return (
        <div className="wrapper">
            <div className="container">
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {!loading && !error && (
                    posts.length > 0 ? (
                        <PostsList posts={posts} setPosts={setPosts}/>
                    ) : (
                        <div>This user has no posts yet.</div>
                    )
                )}
            </div>
        </div>
    );
};

export default UserPostList;