import joi from "joi";

import Joi from "joi";
import { Role } from "./enums.js";

export const signupValidationSchema = joi.object({
    name: Joi.string().trim().min(2).max(50).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name cannot exceed 50 characters",
    }),

    email: Joi.string().email().lowercase().trim().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be valid",
    }),

    password: Joi.string().min(8).max(128).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password cannot exceed 128 characters",
    }),

    role: Joi.string()
        .valid(Role.STUDENT, Role.TEACHER)
        .required()
        .messages({
            "any.only": `Role must be one of [${Role.STUDENT}, ${Role.TEACHER}]`,
            "string.empty": "Role is required",
        }),
});

export const loginValidationSchema = joi.object({
    email: Joi.string().email().lowercase().trim().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be valid",
    }),

    password: Joi.string().min(6).max(128).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password cannot exceed 128 characters",
    }),
});

export const attendanceSchema = Joi.object({
    attendance: Joi.array()
        .items(
            Joi.object({
                student_id: Joi.number().integer().positive().required(),
                status: Joi.string().valid("Present", "Absent").required(),
            }),
        )
        .min(1)
        .required(),
});
