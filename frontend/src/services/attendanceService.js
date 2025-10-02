import config from "../config";
import axios from "axios";

const API_BASE_URL = config.apiUrl;

export const getAttendance = async (studentId) => {
    try {
        console.log("Student ID:", studentId);
        const response = await axios.get(
            `${API_BASE_URL}/attendance/${studentId}`,
            { withCredentials: true },
        );
        return response.data.data.attendance;
    } catch (err) {
        const message =
            err.response?.data?.message ||
            err.message ||
            "Get attendance failed";
        throw new Error(message);
    }
};

export const markAttendance = async (attendance) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/attendance/mark`,
            { attendance },
            { withCredentials: true },
        );
        setLastSubmittedTime();
        return response.data.data.attendance;
    } catch (err) {
        const message =
            err.response?.data?.message ||
            err.message ||
            "Mark attendance failed";
        throw new Error(message);
    }
};

export const getLastSubmittedTime = () => {
    const lastSubmitted = localStorage.getItem("lastSubmitted");
    return lastSubmitted ? lastSubmitted : "";
};

export const setLastSubmittedTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
    });

    // HH:MM
    const time = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
    });
    localStorage.setItem("lastSubmitted", date + ", " + time);
};
