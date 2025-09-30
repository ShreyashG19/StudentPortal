import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import studentsRoutes from "./routes/student.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
    res.send("server is running!");
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentsRoutes);

app.use(errorHandler);

export default app;
