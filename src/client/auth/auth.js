import { config } from "../../config";
import { getToken } from "../auth";

const baseURL = config.baseURL + "/auth/auth/"


const login = (data) => {
    return fetch(baseURL + "token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        })
    })
        .then(resp => resp.json())
}

const verifyToken = async () => {
    const token = getToken();

    const response = await fetch(baseURL + "verify/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response.ok;
} 

export {
    login,
    verifyToken,
}
