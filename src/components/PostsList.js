import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LikePost from "../components/LikePost";
import CommentPost from "../components/CommentPost";
import UserAvatar from "../components/UserAvatar";
import apiClient from "../util/apiClient";

const PostsList = ({ posts, setPosts }) => {
    const { authenticated, currentUser } = useContext(AuthContext);
    const location = useLocation();

    const handleDeletePost = async (postId) => {
        const confirmed = window.confirm("Are you sure?");
        if (!confirmed) return;

        try {
            // eslint-disable-next-line
            const response = await apiClient.delete(`/posts/${postId}`);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!posts || posts.length === 0) {
        return <div>There's nothing to see here. For now...</div>;
    }

    const showDeleteButton = location.pathname.startsWith('/user/');

    return (
        <>
            {posts.map((post) => (
                <article key={post.id} className="post">
                    <header className="postHeader">
                        <div className="postUser">
                            <UserAvatar
                                userId={post.user.id}
                                imagePath={post.user.profileImagePath}
                                username={post.user.username}
                            />
                            {( authenticated && showDeleteButton && (post.user.id === currentUser.user.id || currentUser.authorities.some(auth => auth.authority === "ROLE_ADMIN"))) && (
                                <i className="bi bi-trash" onClick={() => handleDeletePost(post.id)}></i>
                            )}
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
                            <LikePost postId={post.id} initialIsLiked={post.liked} initialLikesCount={post.likesCount} />
                            <CommentPost
                                post={post}
                                postId={post.id}
                                initialCommentsCount={post.commentsCount}
                            />
                        </div>
                    </footer>
                </article>
            ))}
        </>
    );
};

export default PostsList;
