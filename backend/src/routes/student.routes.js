import express from "express";
import { Role } from "../utils/enums.js";
import { authorizeRoles, verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", verifyToken, authorizeRoles([Role.TEACHER]), );
