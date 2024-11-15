import React from 'react';
import LikePost from "../components/LikePost";
import CommentPost from "../components/CommentPost";
import UserAvatar from "../components/UserAvatar";

const PostsList = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return <div>Посты не найдены.</div>;
    }

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
            ))}
        </>
    );
};

export default PostsList;