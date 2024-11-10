import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import PostList from './Post';
import Header from './Header';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div id="main">
        <Header />
        <PostList />
    </div>
);

reportWebVitals();
