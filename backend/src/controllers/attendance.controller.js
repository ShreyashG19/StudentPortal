import {
    getAttendanceByStudentId,
    markAllAttendance,
} from "../services/attendance.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getAttendance = asyncHandler(async (req, res) => {
    const { student_id } = req.params;
    const attendance = await getAttendanceByStudentId(student_id);
    res.json(
        new ApiResponse(200, "Attendance fetched successfully", { attendance }),
    );
});

export const markAttendance = asyncHandler(async (req, res) => {
    const { attendance } = req.body; //attendance array
    if (!attendance) {
        throw new ApiError(400, "Attendance is required");
    }

    try {
        await markAllAttendance(attendance);
    } catch (err) {
        if (err.code === "23505") {
            throw new ApiError(
                400,
                "Attendance just submitted, wait for some time",
            );
        }
        err.message = "Something went wrong";
    }

    res.json(
        new ApiResponse(200, "Attendance updated successfully", {
            attendance,
        }),
    );
});
