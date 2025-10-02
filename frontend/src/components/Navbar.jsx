import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, User } from "lucide-react"; // lucide icons

function Navbar() {
    const { user, logout } = useAuth();
    const onLogout = () => {
        logout();
    };
    return (
        <nav className="flex items-center justify-between px-8 py-2 bg-white shadow">
            <div className="text-xl font-bold text-blue-700 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-700" />
                Welcome {user.name.split(" ")[0]}
            </div>
            <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
            >
                <LogOut className="w-5 h-5" />
                Logout
            </button>
        </nav>
    );
}

export default Navbar;
