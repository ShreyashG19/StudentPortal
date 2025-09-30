import express from "express";
import {
    loginValidation,
    signupValidation,
} from "../middlewares/auth.middleware.js";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", logout);

export default router;
