import React, { useState, useEffect } from 'react';
import './Post.css';
import apiClient from './util/apiClient';
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import UserAvatar from "./UserAvatar";

const PostList = () => {
    const [posts, setPosts] = useState([]);  // Хранение постов
    const [loading, setLoading] = useState(true);  // Индикатор загрузки
    const [error, setError] = useState(null);  // Хранение ошибки

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/posts');
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.statusText);
                }
                const data = await response.json();
                setPosts(data);  // Сохраняем посты в состояние
                setLoading(false);  // Отключаем индикатор загрузки
            } catch (err) {
                setError(err.message);
                setLoading(false);  // Даже при ошибке выключаем загрузку
            }
        };

        fetchPosts();  // Запускаем загрузку данных при монтировании компонента
    }, []);  // [] означает, что useEffect сработает только при первом рендере

    if (loading) {
        return <div>Загрузка постов...</div>;  // Показываем, пока идет загрузка
    }

    if (error) {
        return <div>Ошибка: {error}</div>;  // Показываем, если произошла ошибка
    }

    return (
        <div className="container">
            {posts.map((post) => (
                <article key={post.id} className="post">
                    <header className="postHeader">
                        <div className="postUser">
                            <UserAvatar userId={post.user.id} imagePath={post.user.profileImagePath} username={post.user.username} />
                        </div>
                        <h2 className="postTitle">{post.title}</h2>
                        {post.imagePath && (
                            <img className="postImage" src={post.imagePath} alt="Post Image" />
                        )}
                        <p className="postDate">
                            <span className="postDateLabel">Posted on: </span>
                            <span className="postDateValue">{post.createdAt}</span>
                        </p>
                    </header>
                    <div className="postContent">
                        <p className="postText">{post.content}</p>
                    </div>
                    <footer>
                        <LikePost postId={post.id} />  {/* Добавляем компонент лайка для каждого поста */}
                        <CommentPost post={post} postId={post.id} initialCommentsCount={post.commentsCount} />
                    </footer>
                </article>
            ))}
        </div>
    );
};

export default PostList;
