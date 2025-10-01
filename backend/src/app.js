import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import studentsRoutes from "./routes/student.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import cors from "cors";

const app = express();
const corsOptions = {
    origin: [
        "http://localhost:5174",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.get("/api/health", (req, res) => {
    res.send("server is running!");
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/attendance", attendanceRoutes);

app.use(errorHandler);

export default app;
