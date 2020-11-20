import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.PROXY,
})

export default axiosInstance;