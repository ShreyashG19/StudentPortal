import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { login } = useAuth();

    const onSubmit = (data) => {
        console.log("Login data:", data);
        login(data.email, data.password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 hover:underline"
                    >
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
}
