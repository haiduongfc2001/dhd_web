import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000', // Đặt địa chỉ cơ sở của backend
});

export default instance;
