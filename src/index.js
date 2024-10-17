import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Если он вам нужен
import reportWebVitals from './reportWebVitals';
import PostList from './Post'; // Импортируем правильно

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PostList /> // Используем PostList вместо Post
);

// Отправка метрик
reportWebVitals();
