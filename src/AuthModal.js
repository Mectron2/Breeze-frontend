import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const response = await axios.post('http://localhost:8080/api/auth/login', {
                    username: formData.username,
                    password: formData.password
                });
                const token = response.data.accessToken;
                localStorage.setItem('jwtToken', token);
                window.location.reload()
            } else {
                await axios.post('http://localhost:8080/api/auth/register', {
                    username: formData.username,
                    password: formData.password,
                    email: formData.email
                });
            }
            setShowModal(false);
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    };

    return (
        <div>
            <i className="bi bi-person-fill fs-4"
               type="button"
               data-bs-toggle="modal"
               data-bs-target="#authModal">
            </i>

            <div
                className="modal fade"
                id="authModal"
                tabIndex="-1"
                aria-labelledby="addPostModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isLogin ? 'Войти' : 'Регистрация'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Имя пользователя</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Пароль</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                )}
                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                                </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Переключиться на регистрацию' : 'Переключиться на вход'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
