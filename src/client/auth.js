import { config } from "../config";

const baseURL = config.baseURL + '/auth';

const setAuthToken = token => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}

const getToken = () => {
    return localStorage.getItem('token');
}


export {
    setAuthToken,
    getToken,
}
