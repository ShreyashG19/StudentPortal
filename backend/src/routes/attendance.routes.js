import express from "express";
import { Role } from "../utils/enums.js";
import { authorizeRoles, verifyToken } from "../middlewares/auth.middleware.js";
import {
    getAttendance,
    markAttendance,
} from "../controllers/attendance.controller.js";
import { validateAttendance } from "../middlewares/attendance.middleware.js";

const router = express.Router();

router.get(
    "/:student_id",
    verifyToken,
    authorizeRoles([Role.TEACHER]),
    getAttendance,
);
router.post(
    "/mark",
    verifyToken,
    authorizeRoles([Role.TEACHER]),
    validateAttendance,
    markAttendance,
);

export default router;
