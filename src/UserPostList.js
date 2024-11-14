import React, { useState, useEffect } from 'react';
import './Post.css';
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import UserAvatar from "./UserAvatar";
import { useParams } from 'react-router-dom';  // Импортируем для доступа к параметрам URL

const UserPostList = () => {
    const { username } = useParams();  // Получение никнейма из URL
    console.log("Username from params:", username);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/user/${username}`, {
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.statusText);
                }
                const data = await response.json();
                setPosts(data.postDtoList);  // Сохраняем посты пользователя
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [username]);

    if (loading) {
        return <div>Загрузка постов пользователя...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!posts.length) {
        return <div>У этого пользователя пока нет постов.</div>;
    }

    return (
        <div className="container">
            {posts.map((post) => (
                <article key={post.id} className="post">
                    <header className="postHeader">
                        <div className="postUser">
                            <UserAvatar userId={post.user.id} imagePath={post.user.profileImagePath}
                                        username={post.user.username}/>
                        </div>
                        <h2 className="postTitle">{post.title}</h2>
                        {post.imagePath && (
                            <img
                                className="postImage"
                                src={post.imagePath}
                                alt="PostImage"
                            />
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
                            <LikePost postId={post.id}/>
                            <CommentPost
                                post={post}
                                postId={post.id}
                                initialCommentsCount={post.commentsCount}
                            />
                        </div>
                    </footer>
                </article>
            ))}
        </div>
    );
};

export default UserPostList;