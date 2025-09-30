import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import config from "../config/config.js";
import { Role } from "../utils/enums.js";

import {
    signupValidationSchema,
    loginValidationSchema,
} from "../utils/validationSchemas.js";

export const signupValidation = (req, res, next) => {
    const { error } = signupValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json(new ApiError(400, error.message));
    }
    next();
};

export const loginValidation = (req, res, next) => {
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json(new ApiError(400, error.message));
    }
    next();
};

export const authorizeRoles = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new ApiError(401, "Unauthorized"));
    }
    next();
};

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ApiError(401, "Unauthorized"));
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return next(new ApiError(401, "Unauthorized"));
        }
        req.user = decoded;
        next();
    });
};
