import axios from "axios";

import { config } from '../config';


axios.interceptors.response.use((error) => {
    if (axios.isCancel(error)) {
        return console.log(error);
    }
});

const notesClient = axios.create({
    baseURL: "http://localhost:8001",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
});

const authClient = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});


const mediaClient = axios.create({
    baseURL: window.location === "localhost" ? "http://localhost:8002" : (config.baseURL + "/media"),
    headers: {
        "Content-Type": "application/json",
    },
});

const reminderClient = axios.create({
    baseURL: window.location === "localhost" ? "http://localhost:8003" : (config.baseURL + "/reminder"),
    headers: {
        "Content-Type": "application/json",
    },
});


authClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

notesClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

mediaClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

reminderClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export {
    notesClient,
    authClient,
    mediaClient,
    reminderClient,
};
