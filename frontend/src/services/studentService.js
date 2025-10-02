import { apiGet } from "./api";

export const getAllStudents = async () => {
    try {
        const response = await apiGet(`/students`);
        return response.data.students;
    } catch (err) {
        const message =
            err.response?.data?.message || err.message || "Get students failed";
        throw new Error(message);
    }
};

export const getStudent = async (id) => {
    try {
        const response = await apiGet(`/students/${id}`);
        return response.data.student;
    } catch (err) {
        const message =
            err.response?.data?.message || err.message || "Get student failed";
        throw new Error(message);
    }
};
