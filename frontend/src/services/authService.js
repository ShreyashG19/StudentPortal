import { apiPost } from "./api";

export const authService = {
    login,
    signup,
    logout,
    getCurrentUser,
};

async function login(email, password) {
    try {
        const response = await apiPost(`/auth/login`, { email, password });
        // apiPost returns axios res.data, so token/user are on response.token / response.user
        console.log("Response on login:", response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return {
            user: response.data.user,
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
        const response = await apiPost(`/auth/signup`, {
            name,
            email,
            password,
            role,
        });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        localStorage.setItem("user", JSON.stringify(response.user));
        return {
            user: response.data.user,
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
    localStorage.removeItem("token");
}

function getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}
