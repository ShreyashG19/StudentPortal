import express from "express";
import { signupValidation } from "../middlewares/auth.middleware.js";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);

export default router;
