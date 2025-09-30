import {
    createStudent,
    createTeacher,
    createUser,
    getUserByEmail,
} from "../services/user.service.js";
import { Role } from "../utils/enums.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    let user = await getUserByEmail(email);
    if (user) {
        return res
            .status(400)
            .json(new ApiError(400, "Email already registered"));
    }
    user = await createUser({
        name,
        email,
        password,
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
