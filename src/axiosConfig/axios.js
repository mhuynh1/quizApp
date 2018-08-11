import getAxios from 'axios';
import history from './history'

const axios = getAxios.create({
    withCredentials: true
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, error => {
    if (error.response && error.response.status && 401 === error.response.status) {
        return error
    } else {
        return Promise.reject(error);
    }
});
export default axios