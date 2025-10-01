import config from "../config";
import axios from "axios";

const API_BASE_URL = config.apiUrl;

export const authService = {
    login,
    signup,
    logout,
    getCurrentUser,
};

async function login(email, password) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/login`,
            {
                email,
                password,
            },
            { withCredentials: true },
        );

        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        return {
            user: response.data.data.user,
            message: response.data.message,
        };
    } catch (err) {
        const message =
            err.response?.data?.message || err.message || "Login failed";
        throw new Error(message);
    }
}

async function signup(name, email, password, role) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/signup`,
            {
                name,
                email,
                password,
                role,
            },
            { withCredentials: true },
        );

        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        return {
            user: response.data.data.user,
            message: response.data.message,
        };
    } catch (err) {
        const message =
            err.response?.data?.message || err.message || "Signup failed";
        throw new Error(message);
    }
}

function logout() {
    localStorage.removeItem("user");
}

function getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}
