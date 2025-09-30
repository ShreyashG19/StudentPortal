import express from "express";
import { Role } from "../utils/enums.js";
import { authorizeRoles, verifyToken } from "../middlewares/auth.middleware.js";
import { checkSelfOrTeacherAccess } from "../middlewares/student.middlewares.js";
import { getStudents, getStudent } from "../controllers/student.controller.js";
const router = express.Router();

router.get("/", verifyToken, authorizeRoles([Role.TEACHER]), getStudents);

router.get("/:id", verifyToken, checkSelfOrTeacherAccess, getStudent);

export default router;
