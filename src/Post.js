import React, { useState, useEffect } from 'react';

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
                        <h2 className="postTitle">{post.title}</h2>
                        {post.imageUrl && (
                            <img className="postImage" src={post.imageUrl} alt="Post Image" />
                        )}
                        <p className="postDate">
                            <span className="postDateLabel">Posted on: </span>
                            <span className="postDateValue">{post.createdAt}</span>
                        </p>
                    </header>
                    <div className="postContent">
                        <p className="postText">{post.content}</p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default PostList;
