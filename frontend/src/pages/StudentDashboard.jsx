import React, { useState } from "react";
import ProfileDescriptionItem from "../components/ProfileDescriptionItem";
import Navbar from "../components/Navbar";
import { getAttendance } from "../services/attendanceService";
import { useAuth } from "../context/AuthContext";
export default function StudentDashboard() {
    const { user } = useAuth();
    const data = user;
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch attendance data (simulate API call)
    const fetchAttendance = async () => {
        setLoading(true);
        let attendanceData = await getAttendance(user.student_id);
        attendanceData = attendanceData.map((item) => ({
            date: item.date.split("T")[0],
            status: item.status,
        }));
        setAttendance(attendanceData);
        setLoading(false);
    };

    const handleViewAttendance = () => {
        setShowModal(true);
        fetchAttendance();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setAttendance([]);
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                            <span className="text-3xl font-bold text-blue-700">
                                {data.name[0]}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-blue-700">
                            {data.name}
                        </h2>
                        <span className="text-gray-500">
                            {data.role.toUpperCase()}
                        </span>
                    </div>

                    {/* Info Section */}
                    <div className="divide-y divide-gray-200">
                        <ProfileDescriptionItem
                            label="Roll Number"
                            value={data.roll_number}
                        />
                        <ProfileDescriptionItem
                            label="Class"
                            value={data.class}
                        />
                        <ProfileDescriptionItem
                            label="Email"
                            value={data.email}
                        />
                    </div>

                    {/* View Attendance Button */}
                    <button
                        onClick={handleViewAttendance}
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        View Attendance
                    </button>
                </div>
            </div>

            {/* Attendance Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                        <div className="mb-5 justify-between flex items-center">
                            <h3 className="text-xl font-bold text-blue-700">
                                Attendance
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="bg-red-600 hover:bg-red-700 px-4 py-1 text-md text-white rounded"
                                aria-label="Close"
                            >
                                Close
                            </button>
                        </div>
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">
                                Loading...
                            </div>
                        ) : (
                            <table className="w-full border-2 border-gray-500 rounded-sm mt-2">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-center">
                                            Date
                                        </th>
                                        <th className="py-2 px-4 border-b text-center">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={2}
                                                className="py-4 text-center text-gray-400"
                                            >
                                                No attendance data.
                                            </td>
                                        </tr>
                                    ) : (
                                        attendance.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="py-2 px-4 border-b text-center">
                                                    {item.date}
                                                </td>
                                                <td className="py-2 px-4 border-b text-center">
                                                    {item.status}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
