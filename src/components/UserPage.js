import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/UserPage.css';

const UserPage = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/${username}`);
                setUserData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error loading user data.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="userInfo">
            <div className="userHeader">
            <h1>{userData.username}</h1>
                {userData.profileImagePath && (
                    <img
                        src={userData.profileImagePath}
                        alt={`${userData.username}'s profile`}
                        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                    />
                )}
            </div>
            <p>ID: {userData.id}</p>
            <p>Bio: {userData.bio || 'No information'}</p>
            <p>Account creation date: {new Date(userData.createdAt).toLocaleDateString()}</p>
            <div className="author">
                <h2>By {username}</h2>
            </div>
        </div>
    );
};

export default UserPage;
