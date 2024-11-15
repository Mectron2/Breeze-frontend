import React, { useState, useEffect } from 'react';
import './Post.css';
import apiClient from './util/apiClient';
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import UserAvatar from "./UserAvatar";

const SearchPost = () => {
    const [posts, setPosts] = useState([]);             // Хранение постов
    const [loading, setLoading] = useState(false);     // Индикатор загрузки
    const [error, setError] = useState(null);          // Хранение ошибки
    const [searchTerm, setSearchTerm] = useState('');  // Хранение текущего значения поиска

    // Функция для получения постов, принимает опциональный параметр title
    const fetchPosts = async (title = '') => {
        setLoading(true);
        setError(null);
        try {
            // Формируем URL с параметром поиска, если title не пустой
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

    // Загрузка всех постов при монтировании компонента
    useEffect(() => {
        fetchPosts();
    }, []);

    // Обработчик отправки формы поиска
    const handleSearch = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        fetchPosts(searchTerm);
    };

    // Обработчик изменения ввода
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="wrapper">
        <form className="searchForm" onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Поиск по заголовку..."
            />
        </form>
    <div className="container">
        {loading && <div>Загрузка постов...</div>}
        {!loading && !error && (
            posts.length > 0 ? (
                posts.map((post) => (
                    <article key={post.id} className="post">
                            <header className="postHeader">
                                <div className="postUser">
                                    <UserAvatar
                                        userId={post.user.id}
                                        imagePath={post.user.profileImagePath}
                                        username={post.user.username}
                                    />
                                </div>
                                <h2 className="postTitle">{post.title}</h2>
                                {post.imagePath && (
                                    <img className="postImage" src={post.imagePath} alt="PostImage" />
                                )}
                                <p className="postDate">
                                    <span className="postDateLabel">Posted on: </span>
                                    <span className="postDateValue">{new Date(post.createdAt).toLocaleString()}</span>
                                </p>
                            </header>
                            <div className="postContent">
                                <p className="postText">{post.content}</p>
                            </div>
                            <footer>
                                <div className="likesAndComments">
                                    <LikePost postId={post.id} />
                                    <CommentPost
                                        post={post}
                                        postId={post.id}
                                        initialCommentsCount={post.commentsCount}
                                    />
                                </div>
                            </footer>
                        </article>
                    ))
                ) : (
                    <div>Посты не найдены.</div>
                )
            )}
        </div>
        </div>
    );
};

export default SearchPost;