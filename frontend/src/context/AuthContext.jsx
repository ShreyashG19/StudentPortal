import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Role } from "../utils/enums";
// Create context
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
    const userFromLocalStorage = authService.getCurrentUser();
    const [user, setUser] = useState(userFromLocalStorage);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const navigateByRole = async (role) => {
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
            const data = await authService.login(email, password);
            setUser(data.user);
            navigateByRole(data.user.role);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const signup = async (name, email, password, role) => {
        const data = await authService.signup(name, email, password, role);
        setUser(data);
        navigateByRole(data.role);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        navigate("/"); // redirect to login page
    };

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        console.log("current user", currentUser);
        if (currentUser) {
            setUser(currentUser);
            navigateByRole(currentUser.role);
        } else {
            navigate("/", { replace: true });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};
