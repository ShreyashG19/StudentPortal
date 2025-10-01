import React from "react";
import { useAuth } from "../context/AuthContext";
function Navbar() {
    const { user, logout } = useAuth();
    const onLogout = () => {
        logout();
    };
    return (
        <nav className="flex items-center justify-between px-8 py-2 bg-white shadow">
            <div className="text-xl font-bold text-blue-700">
                Welcome {user.name.split(" ")[0]}
            </div>
            <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
                Logout
            </button>
        </nav>
    );
}

export default Navbar;
