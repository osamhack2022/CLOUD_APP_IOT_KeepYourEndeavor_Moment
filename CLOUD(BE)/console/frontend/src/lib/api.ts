import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: `http://api.jerrykang.com/v1`,
});

export const getBlocks = () => api.get(`/block`)