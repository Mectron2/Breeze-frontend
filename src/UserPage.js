import React from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Страница пользователя</h1>
            <p>Здесь будет информация о пользователе с ID: {id}</p>
            {/* Можно добавить дополнительную информацию, например, запрос к API для получения данных пользователя */}
        </div>
    );
};

export default UserPage;
