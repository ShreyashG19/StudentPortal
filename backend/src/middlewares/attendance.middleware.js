import { attendanceSchema } from "../utils/validationSchemas.js";
import ApiError from "../utils/ApiError.js";

export const validateAttendance = (req, res, next) => {
    const { error } = attendanceSchema.validate(req.body);
    if (error) {
        return next(
            new ApiError(400, error.details.map((d) => d.message).join(", ")),
        );
    }
    next();
};
