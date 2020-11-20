import axios from 'axios';

const axiosInstance = axios.create({
    timeout: 3000,
    baseURL: 'http://localhost:3000'
});

export default axiosInstance;