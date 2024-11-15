import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/Post';
import Header from './components/Header';
import UserPage from './components/UserPage';
import './stylesheets/index.css';
import UserPostList from "./components/UserPostList";
import SearchPost from "./components/searchPost";

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
                path="/user/:username"
                element={
                    <>
                        <Header/>
                            <div className="userPostsContainer">
                                <UserPage/>
                                <UserPostList/>
                            </div>
                        </>
                }
            />
            <Route
                path="/search"
                element={
                <>
                    <Header />
                    <div className="postContainer">
                        <SearchPost />
                    </div>
                </>
                }
            />
        </Routes>
    </Router>
);
