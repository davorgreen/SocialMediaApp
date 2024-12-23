import axios from 'axios';

const API_BASE_URL = 'https://green-api-nu.vercel.app/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});
//users
export const fetchUsers = (token) => {
    return api.get('/users?offset=0&limit=50', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

//friends
export const fetchFriends = (token) => {
    return api.get('/friends', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

//posts
export const fetchPosts = (token) => {
    return api.get('/posts?offset=0&limit=50', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

//posts photos
export const fetchPostPhoto = (postId, token) => {
    return api.get(`/photos/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

//user photos
export const fetchPhotos = (id, token) => {
    return api.get(`/photos/${id}?offset=0&limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

//users photos
export const fetchUsersPhoto = (userId, token) => {
    return api.get(`/photos/${userId}?offset=0&limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

