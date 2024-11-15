import React, { useState, useEffect } from 'react';
import '../stylesheets/Post.css';
import PostsList from '../components/PostsList';

const SearchPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPosts = async (title = '') => {
        setLoading(true);
        setError(null);
        try {
            const url = title
                ? `http://localhost:8080/api/posts/search?title=${encodeURIComponent(title)}`
                : 'http://localhost:8080/api/posts';

            const response = await fetch(url);
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

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPosts(searchTerm);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

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
                    <button type="submit" className="btn btn-dark m-3">Поиск</button>
            </form>

            <div className="container">
                {loading && <div>Загрузка постов...</div>}
                {error && <div>Ошибка: {error}</div>}
                {!loading && !error && <PostsList posts={posts}/>}
            </div>
        </div>
    );
};

export default SearchPost;