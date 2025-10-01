import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import StudentDashboard from "../pages/StudentDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            {/* Add more routes here */}
        </Routes>
    );
}
