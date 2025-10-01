import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Role } from "../utils/enums";
import { useToast } from "../context/ToastContext";
import toast from "react-hot-toast";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // start in loading
    const navigate = useNavigate();
    const { showSuccess, showError, showLoading } = useToast();

    const navigateByRole = (role) => {
        if (role === Role.STUDENT) {
            navigate("/student/dashboard", { replace: true });
        } else if (role === Role.TEACHER) {
            navigate("/teacher/dashboard", { replace: true });
        } else {
            navigate("/");
        }
    };

    const login = async (email, password) => {
        try {
            // setIsLoading(true);
            showLoading("Logging in...");
            const data = await authService.login(email, password);
            setUser(data.user);
            showSuccess("Login successful!");
            navigateByRole(data.user.role);
        } catch (err) {
            console.error(err);
            showError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (name, email, password, role) => {
        try {
            // setIsLoading(true);
            showLoading("Signing up...");
            const data = await authService.signup(name, email, password, role);
            showSuccess("Signup successful! please login");
            navigate("/login", { replace: true });
        } catch (err) {
            console.error(err);
            showError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        showSuccess("Logout successful!");
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        // restore user from storage on first load
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, isLoading, login, signup, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
