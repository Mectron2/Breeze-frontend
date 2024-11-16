import React, {useContext, useState} from 'react';
import apiClient from '../util/apiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../stylesheets/AddPost.css';
import {useNavigate} from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const AddPost = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    // eslint-disable-next-line
    const [contentType, setContentType] = useState('TEXT');
    const [content, setContent] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedContentType = imageFile ? 'IMAGE' : 'TEXT';

        let uploadedImagePath = '';

        if (imageFile) {
            const formData = new FormData();
            formData.append('file', imageFile);

            try {
                const response = await apiClient.post('/files/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200 || response.status === 201) {
                    uploadedImagePath = response.data;
                }
            } catch (error) {
                setResponseMessage('Error while uploading file.');
                console.error('Error uploading file:', error);
                return;
            }
        }

        const postData = {
            title: title,
            imagePath: updatedContentType === 'TEXT' ? null : `http://localhost:8080${uploadedImagePath}`,
            content: content,
            contentType: updatedContentType,
        };

        try {
            const response = await apiClient.post('/posts', postData);

            if (response.status === 200 || response.status === 201) {
                setResponseMessage('Post successfully added!');
                console.log('Server response:', response.data);
                setTitle('');
                setImageFile(null);
                setContent('');
                setContentType('TEXT');
                navigate(`/user/${currentUser.user.username}`)
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
            <i
                type="button"
                className="bi bi-plus-square-fill fs-4"
                data-bs-toggle="modal"
                data-bs-target="#addPostModal"
            >
            </i>

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
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
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
                                    <label htmlFor="imageFile" className="form-label">Image:</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="imageFile"
                                        name="imageFile"
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => setImageFile(e.target.files[0])}
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
                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Add Post</button>
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
