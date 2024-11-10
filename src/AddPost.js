import React, { useState } from 'react';
import apiClient from './util/apiClient'; // Импортируем наш клиент
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './AddPost.css';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [content, setContent] = useState('');
    const [contentType, setContentType] = useState('TEXT');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title: title,
            imagePath: imagePath,
            content: content,
            contentType: contentType,
        };

        try {
            const response = await apiClient.post('/posts', postData);

            if (response.status === 200 || response.status === 201) {
                setResponseMessage('Post successfully added!');
                console.log('Server response:', response.data);
                setTitle('');
                setImagePath('');
                setContent('');
                setContentType('TEXT');
            } else {
                setResponseMessage('Failed to add post.');
                console.error('Error response:', response.statusText);
            }
        } catch (error) {
            setResponseMessage('Error while adding post.');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* Кнопка для открытия модального окна */}
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addPostModal"
            >
                +
            </button>

            {/* Модальное окно */}
            <div
                className="modal fade"
                id="addPostModal"
                tabIndex="-1"
                aria-labelledby="addPostModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addPostModalLabel">Add New Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imagePath" className="form-label">Image Path:</label>
                                    <input
                                        type="text"
                                        id="imagePath"
                                        className="form-control"
                                        value={imagePath}
                                        onChange={(e) => setImagePath(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Content:</label>
                                    <textarea
                                        id="content"
                                        className="form-control"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contentType" className="form-label">Content Type:</label>
                                    <select
                                        id="contentType"
                                        className="form-select"
                                        value={contentType}
                                        onChange={(e) => setContentType(e.target.value)}
                                    >
                                        <option value="TEXT">TEXT</option>
                                        <option value="IMAGE">IMAGE</option>
                                        <option value="VIDEO">VIDEO</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success">Add Post</button>
                            </form>
                            {responseMessage && <p className="mt-2">{responseMessage}</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
