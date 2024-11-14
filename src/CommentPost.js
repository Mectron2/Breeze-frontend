import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import apiClient from './util/apiClient';
import './CommentPost.css';
import UserAvatar from "./UserAvatar";

const CommentPost = ({ post, postId, initialCommentsCount }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null); // Создаем реф для модального окна

    useEffect(() => {
        const fetchComments = async () => {
            if (!postId) return;

            try {
                setLoading(true);
                const response = await apiClient.get(`/post/comments/${postId}`);
                setComments(response.data);
                setLoading(false);
            } catch (err) {
                setError('Ошибка при загрузке комментариев');
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        try {
            await apiClient.post(`/post/comments`, {
                postId: postId,
                content: newComment
            });
            setNewComment('');
            const updatedComments = await apiClient.get(`/post/comments/${postId}`);
            setComments(updatedComments.data);
        } catch (err) {
            console.error('Ошибка при добавлении комментария:', err);
        }
    };

    // Функция для отключения прокрутки и добавления отступа
    const disableScroll = () => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;
    };

    // Функция для восстановления прокрутки и удаления отступа
    const enableScroll = () => {
        // Задержка в 300 мс (длительность анимации)
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        }, 0); // Убедитесь, что это совпадает с timeout CSSTransition
    };

    return (
        <>
            <i className="bi bi-chat-left-text" onClick={() => setShowModal(true)}> {initialCommentsCount || comments.length} </i>
            <CSSTransition
                in={showModal}
                timeout={100}
                classNames="modal"
                unmountOnExit
                nodeRef={modalRef}
                onEnter={disableScroll}
                onExited={enableScroll}
            >
                <div ref={modalRef} className="modal-wrapper">
                    <div className="modal" tabIndex="-1" style={{display: 'block'}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <header className="postHeader">
                                        <UserAvatar
                                            userId={post.user.id}
                                            imagePath={post.user.profileImagePath}
                                            username={post.user.username}
                                        />
                                        <h5 className="modal-title">{post.title}</h5>
                                    </header>
                                    <button type="button" className="btn-close"
                                            onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p className="postContent">{post.content}</p>
                                    {post.imagePath && (
                                        <img className="postImage" src={post.imagePath} alt="Post"/>
                                    )}
                                    <hr/>
                                    {loading ? (
                                        <p>Загрузка комментариев...</p>
                                    ) : error ? (
                                        <p>{error}</p>
                                    ) : (
                                        <ul className="comment-list">
                                            {comments.map(comment => (
                                                <li key={comment.user.id} className="comment-item">
                                                    <div className="comment-header">
                                                        <img
                                                            src={comment.user.profileImagePath}
                                                            alt={`${comment.user.username}'s avatar`}
                                                            className="comment-avatar"
                                                        />
                                                        <strong>{comment.user.username}</strong>
                                                    </div>
                                                    <p>{comment.content}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Добавить комментарий"
                                    />
                                    <button className="btn btn-success" onClick={handleAddComment}>
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};

export default CommentPost;
