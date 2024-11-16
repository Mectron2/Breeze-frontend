import React, { useState, useEffect, useRef, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import apiClient from '../util/apiClient';
import '../stylesheets/CommentPost.css';
import UserAvatar from "../components/UserAvatar";
import { AuthContext } from '../context/AuthContext';

const CommentPost = ({ post, postId, initialCommentsCount }) => {
    const { authenticated, currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);
    const [commentsCount, setCommentsCount] = useState(initialCommentsCount || 0);

    useEffect(() => {
        const fetchComments = async () => {
            if (!postId) return;

            try {
                setLoading(true);
                const response = await apiClient.get(`/post/comments/${postId}`);
                setComments(response.data);
                setCommentsCount(response.data.length);
                setLoading(false);
            } catch (err) {
                setError('Error loading comments');
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
            setCommentsCount(updatedComments.data.length);
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const confirmed = window.confirm("Are you sure you want to delete this comment?");
        if (!confirmed) return;

        try {
            await apiClient.delete(`/post/comments/${commentId}`);
            setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
            setCommentsCount((prevCount) => prevCount - 1);
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };

    const disableScroll = () => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;
    };

    const enableScroll = () => {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0px';
    };

    return (
        <>
            <i className="bi bi-chat-left-text" onClick={() => setShowModal(true)}> {commentsCount} </i>
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
                    <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
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
                                        <img className="postImage" src={post.imagePath} alt="Post" />
                                    )}
                                    <hr />
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>{error}</p>
                                    ) : (
                                        <ul className="comment-list">
                                            {comments.map(comment => (
                                                <li key={comment.id} className="comment-item">
                                                    <div className="comment-header">
                                                        <div className="comment-author">
                                                            <img
                                                                src={comment.user.profileImagePath}
                                                                alt={`${comment.user.username}'s avatar`}
                                                                className="comment-avatar"
                                                            />
                                                            <strong>{comment.user.username}</strong>
                                                        </div>
                                                        {authenticated && (comment.user.id === currentUser.user.id || currentUser.authorities.some(auth => auth.authority === "ROLE_ADMIN")) && (
                                                            <i className="bi bi-trash comment-delete-icon"
                                                               onClick={() => handleDeleteComment(comment.id)}>
                                                            </i>
                                                        )}
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
                                    <button
                                        className="btn btn-success"
                                        onClick={handleAddComment}
                                        disabled={!authenticated}
                                    >
                                        Submit
                                    </button>
                                    {!authenticated && <p className="text-danger">Please, login to submit a comment.</p>}
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
