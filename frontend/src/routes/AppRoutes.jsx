import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import StudentDashboard from "../pages/StudentDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
import AuthGuard from "../components/AuthGuard";
import { Role } from "../utils/enums";
export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<AuthGuard reverse />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            {/* students routes */}
            <Route element={<AuthGuard allowedRoles={[Role.STUDENT]} />}>
                <Route
                    path="/student/dashboard"
                    element={<StudentDashboard />}
                />
            </Route>
            {/* teacher routes */}
            <Route element={<AuthGuard allowedRoles={[Role.TEACHER]} />}>
                <Route
                    path="/teacher/dashboard"
                    element={<TeacherDashboard />}
                />
            </Route>
        </Routes>
    );
}
