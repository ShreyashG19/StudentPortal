import config from "../config";
import axios from "axios";

const API_BASE_URL = config.apiUrl;

export const getAllStudents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students`, {
            withCredentials: true,
        });
        return response.data.data.students;
    } catch (err) {
        const message =
            err.response?.data?.message || err.message || "Get students failed";
        throw new Error(message);
    }
};

export const getStudent = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students/${id}`, {
            withCredentials: true,
        });
        return response.data.data.student;
    } catch (err) {
        const message =
            err.response?.data?.message || err.message || "Get student failed";
        throw new Error(message);
    }
};
