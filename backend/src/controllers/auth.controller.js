import config from "../config/config.js";
import { createUser, getUserByEmail } from "../services/user.service.js";
import {
    createStudent,
    getStudentByUserId,
} from "../services/student.service.js";
import {
    createTeacher,
    getTeacherByUserId,
} from "../services/teacher.service.js";
import { Role } from "../utils/enums.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    let user = await getUserByEmail(email);
    if (user) {
        return res
            .status(400)
            .json(new ApiError(400, "Email already registered"));
    }
    const hashedPassword = await hashPassword(password);
    user = await createUser({
        name,
        email,
        password: hashedPassword,
        role,
    });

    if (user.role === Role.STUDENT) {
        await createStudent({
            id: user.id,
            class: "12th",
        });
        user.class = "12th";
    } else {
        await createTeacher({
            id: user.id,
            subject: "English",
        });
        user.subject = "English";
    }

    res.json(new ApiResponse(200, "User created successfully", { user }));
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let user = await getUserByEmail(email);
    if (!user) {
        return res.status(400).json(new ApiError(400, "User not found"));
    }
    const isPasswordCorrect = await comparePassword(
        password,
        user.password_hash,
    );
    if (!isPasswordCorrect) {
        return res.status(400).json(new ApiError(400, "Incorrect password"));
    }
    const token = jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        config.jwtSecret,
        {
            expiresIn: "30d",
        },
    );

    //combining all user data
    if (user.role === Role.STUDENT) {
        const student = await getStudentByUserId(user.id);
        user.class = student.class;
        user.roll_number = student.roll_number;
        user.student_id = student.id;
    } else {
        const teacher = await getTeacherByUserId(user.id);
        user.subject = teacher.subject;
        user.teacher_id = teacher.id;
    }
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    delete user.password_hash;
    res.json(new ApiResponse(200, "Login successful", { user }));
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.json(new ApiResponse(200, "Logout successful"));
});
