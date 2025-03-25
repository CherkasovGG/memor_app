import { config } from "../../config";
import { getToken } from "../auth";

const baseURL = config.baseURL + '/notes/workspace/'


const getWorkspace = () => {
    return fetch(baseURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
    })
        .then(res => res.json())
}


export {
    getWorkspace,
}
