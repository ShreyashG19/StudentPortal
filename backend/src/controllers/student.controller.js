import { getAllStudents, getStudentById } from "../services/student.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents();
    res.json(
        new ApiResponse(200, "Students fetched successfully", { students }),
    );
});

export const getStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentById(id);
    res.json(new ApiResponse(200, "Student fetched successfully", { student }));
});
