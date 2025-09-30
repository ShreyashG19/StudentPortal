import { getStudentByUserId } from "../services/student.service.js";
import ApiError from "../utils/ApiError.js";
import { Role } from "../utils/enums.js";

export const checkSelfOrTeacherAccess = async (req, res, next) => {
    if (req.user.role === Role.TEACHER) {
        next();
        return;
    }

    req.params.id = Number(req.params.id);
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
