import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allFestivals: `${process.env.REACT_APP_BASE_URL}/api/festivals/`,
  singleFestival: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/festivals/${id}/`,
  account: (userId) =>
    `${process.env.REACT_APP_BASE_URL}/api/account/${userId}`,
  allGenres: `${process.env.REACT_APP_BASE_URL}/api/genres/`,
  createReview: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/festivals/${id}/reviews`,
  singleReview: (festivalId, reviewId) =>
    `${process.env.REACT_APP_BASE_URL}/api/festivals/${festivalId}/reviews/${reviewId}`,
  login: `${process.env.REACT_APP_BASE_URL}/api/auth/login/`,
  register: `${process.env.REACT_APP_BASE_URL}/api/auth/register/`,
  search: (query) =>
    `${process.env.REACT_APP_BASE_URL}/api/festivals/search?search=${query}`,
  cloudinary: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/`,
};

const getHeaders = () => ({
  headers: {
    authorization: `Bearer ${AUTH.getToken()}`,
  },
});

const GET = (endpoint) => axios.get(endpoint);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

export const API = { GET, POST, PUT, DELETE, ENDPOINTS, getHeaders };
