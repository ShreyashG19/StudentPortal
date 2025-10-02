import React, { useState } from "react";
import ProfileDescriptionItem from "../components/ProfileDescriptionItem";
import Navbar from "../components/Navbar";
import { getAttendance } from "../services/attendanceService";
import { useAuth } from "../context/AuthContext";
import {
    User,
    AtSign,
    Hash,
    BookOpen,
    CalendarDays,
    Clock,
    CheckCircle,
    X,
    Eye,
    GraduationCap,
} from "lucide-react"; // lucide icons

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
        attendanceData = attendanceData.map((item) => {
            return {
                date: item.date.split("T")[0],
                time: item.time,
                status: item.status,
            };
        });
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
                            <User className="w-12 h-12 text-blue-700" />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                            {data.name}
                        </h2>
                        <span className="text-gray-500 flex items-center gap-1">
                            <GraduationCap className="w-4 h-4 mr-1" />
                            {data.role.toUpperCase()}
                        </span>
                    </div>

                    {/* Info Section */}
                    <div className="divide-y divide-gray-200">
                        <ProfileDescriptionItem
                            label={
                                <span className="flex items-center gap-1">
                                    <Hash className="w-4 h-4" />
                                    Roll Number
                                </span>
                            }
                            value={data.roll_number}
                        />
                        <ProfileDescriptionItem
                            label={
                                <span className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    Class
                                </span>
                            }
                            value={data.class}
                        />
                        <ProfileDescriptionItem
                            label={
                                <span className="flex items-center gap-1">
                                    <AtSign className="w-4 h-4" />
                                    Email
                                </span>
                            }
                            value={data.email}
                        />
                    </div>

                    <button
                        onClick={handleViewAttendance}
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                        <Eye className="w-5 h-5" />
                        View Attendance Records
                    </button>
                </div>
            </div>

            {/* Attendance Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                        <div className="mb-5 justify-between flex items-center">
                            <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                                <CalendarDays className="w-5 h-5" />
                                Attendance
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="bg-red-600 hover:bg-red-700 px-4 py-1 text-md text-white rounded flex items-center gap-1"
                                aria-label="Close"
                            >
                                <X className="w-4 h-4" />
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
                                            <CalendarDays className="inline w-4 h-4 mr-1" />
                                            Date
                                        </th>
                                        <th className="py-2 px-4 border-b text-center">
                                            <Clock className="inline w-4 h-4 mr-1" />
                                            Time
                                        </th>
                                        <th className="py-2 px-4 border-b text-center">
                                            <CheckCircle className="inline w-4 h-4 mr-1" />
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={3}
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
                                                    {item.time}
                                                </td>
                                                <td className="py-2 px-4 border-b text-center">
                                                    {item.status ===
                                                    "Present" ? (
                                                        <span className="flex items-center justify-center gap-1 text-green-600">
                                                            <CheckCircle className="w-4 h-4" />
                                                            Present
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center justify-center gap-1 text-red-600">
                                                            <X className="w-4 h-4" />
                                                            Absent
                                                        </span>
                                                    )}
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
