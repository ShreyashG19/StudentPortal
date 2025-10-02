import axios from "axios";
import config from "../config";

const BASE_URL = config.apiUrl;

export const apiGet = async (url) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}${url}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return res.data;
    } catch (err) {
        console.error("GET request failed:", err.response || err);
        throw err;
    }
};

export const apiPost = async (url, data) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${BASE_URL}${url}`, data, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return res.data;
    } catch (err) {
        console.error("POST request failed:", err.response || err);
        throw err;
    }
};
