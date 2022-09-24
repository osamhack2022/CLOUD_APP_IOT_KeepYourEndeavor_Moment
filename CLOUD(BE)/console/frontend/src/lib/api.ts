import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/v1/`,
});
//유저관리
export const login = (user) => api.post(`auth/signin`, user)