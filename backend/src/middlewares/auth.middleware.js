import joi from "joi";
import ApiError from "../utils/ApiError.js";
import { Role } from "../utils/enums.js";
import { signupValidationSchema } from "../utils/validationSchemas.js";

export const signupValidation = (req, res, next) => {
    const { error } = signupValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json(new ApiError(400, error.message));
    }
    next();
};

