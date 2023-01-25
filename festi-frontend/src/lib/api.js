import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allFestivals: '/api/festivals/',
  singleFestival: (id) => `/api/festivals/${id}`,
  account: (userId) => `/api/account/${userId}`,
  createReview: (id) => `/api/festivals/${id}/reviews`,
  singleReview: (festivalId, reviewId) =>
    `/api/festivals/${festivalId}/reviews/${reviewId}`,
  login: '/api/auth/login/',
  register: '/api/auth/register/',
  search: (query) => `/api/festivals/search?search=${query}`,
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
