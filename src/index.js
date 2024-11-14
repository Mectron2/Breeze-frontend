import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './Post';
import Header from './Header';
import UserPage from './UserPage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Header />
                        <div className="postContainer">
                            <PostList />
                        </div>
                    </>
                }
            />
            <Route
                path="/user/:id"
                element={
                    <>
                        <Header />
                        <UserPage />
                    </>
                }
            />
        </Routes>
    </Router>
);
