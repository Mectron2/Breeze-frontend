import React, { useState, useEffect, useContext } from 'react';
import '../stylesheets/Post.css';
import PostsList from '../components/PostsList';
import { AuthContext } from "../context/AuthContext";

const SearchPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { authenticated, isAuthReady } = useContext(AuthContext);

    const fetchPosts = async (title = '') => {
        setLoading(true);
        setError(null);

        try {
            const url = title
                ? `http://localhost:8080/api/posts/search?title=${encodeURIComponent(title)}`
                : 'http://localhost:8080/api/posts';

            const response = await fetch(url, {
                headers: authenticated
                    ? {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    }
                    : { Accept: 'application/json' },
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

    useEffect(() => {
        if (!isAuthReady) return;
        fetchPosts();
    }, [authenticated, isAuthReady]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPosts(searchTerm);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (!isAuthReady) {
        return <div>Loading authentication...</div>;
    }

    return (
        <div className="wrapper">
            <form className="d-flex" onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    className="form-control m-3"
                    onChange={handleInputChange}
                    placeholder="What are we looking for?"
                />
                <button type="submit" className="btn btn-dark m-3">
                    Search
                </button>
            </form>

            <div className="container">
                {loading && <div>Loading...</div>}
                {error && <div style={{ color: 'red' }}>Error: {error}</div>}
                {!loading && !error && <PostsList posts={posts} />}
            </div>
        </div>
    );
};

export default SearchPost;
