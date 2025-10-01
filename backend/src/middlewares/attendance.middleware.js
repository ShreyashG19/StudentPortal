import { attendanceSchema } from "../utils/validationSchemas.js";
import ApiError from "../utils/ApiError.js";
import { getStudentByUserId } from "../services/student.service.js";
import { Role } from "../utils/enums.js";

export const validateAttendance = (req, res, next) => {
    const { error } = attendanceSchema.validate(req.body);
    if (error) {
        return next(
            new ApiError(400, error.details.map((d) => d.message).join(", ")),
        );
    }
    next();
};

export const checkSelfOrTeacherAccess = async (req, res, next) => {
    if (req.user.role === Role.TEACHER) {
        next();
        return;
    }

    req.params.id = Number(req.params.student_id);
    const { id } = req.params;

    const { user } = req;
    try {
        const foundUser = await getStudentByUserId(user.id);
        if (foundUser.id !== id) {
            return next(new ApiError(401, "Unauthorized"));
        }
    } catch (err) {
        return next(new ApiError(401, "Unauthorized"));
    }
    next();
};
