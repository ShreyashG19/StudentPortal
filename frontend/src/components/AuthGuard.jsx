import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleRedirects = {
    student: "/student/dashboard",
    teacher: "/teacher/dashboard",
};

const AuthGuard = ({ reverse = false, allowedRoles }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Reverse Guard (for public routes like /login, /signup)
    if (reverse) {
        if (user) {
            return <Navigate to={roleRedirects[user.role] || "/"} replace />;
        }
        return <Outlet />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={roleRedirects[user.role] || "/"} replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
