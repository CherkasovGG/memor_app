import { config } from "../../config";
import { EventEmitter } from "../../events/events";
import { getToken } from "../auth";

const baseURL = config.baseURL + '/reminder/reminder';


const getReminder = async (id) => {
    const response = await fetch(baseURL + '/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
};

const getReminders = async (data) => {
    const response = await fetch(baseURL + '/?' + new URLSearchParams(data), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};

const createReminder = async (data) => {
    const response = await fetch(baseURL + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const createdData = await response.json();
    return createdData;
};


const deleteReminder = async (id) => {
    const response = await fetch(baseURL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

export {
    getReminder,
    createReminder,
    deleteReminder,
    getReminders,
};
