import axios, { Axios } from 'axios';

const API: Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_UR,
    timeout: 80000,
});

API.interceptors.request.use(
    async (config) => {
        // set headers here.
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

export { API };