import axios from 'axios';

const axiosInstance = process.env.NODE_ENV === 'development' ? axios.create({
    baseURL: process.env.PROXY,
}) : axios.create({
    baseURL: 'https://api.yelp.com/v3',
    headers: {
        Authorization: `Bearer ${process.env.APP_TOKEN}`
    },
})

export default axiosInstance;