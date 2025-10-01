import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getAllStudents } from "../services/studentService";
import { useToast } from "../context/ToastContext";
import { getAttendance, markAttendance } from "../services/attendanceService";
// const students = [
//     { id: 1, name: "Alice Smith" },
//     { id: 2, name: "Bob Johnson" },
//     { id: 3, name: "Charlie Brown" },
// ];

function TeacherDashboard() {
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth();
    const { showError, showSuccess, showLoading } = useToast();
    const teacherData = user;

    // Fetch students on component mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudents();
                setStudents(data);

                // initialize attendance with "Present"
                const initialAttendance = data.reduce((acc, student) => {
                    acc[student.id] = "Present";
                    return acc;
                }, {});
                setAttendance(initialAttendance);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleToggle = (studentId, status) => {
        setAttendance((prev) => ({
            ...prev,
            [studentId]: status,
        }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        const attendanceData = students.map((student) => ({
            student_id: student.id,
            status: attendance[student.id],
        }));
        try {
            const data = await markAttendance(attendanceData);
            showSuccess("Attendance submitted successfully!");
            setSubmitting(false);
        } catch (error) {
            showError(error.message);
            setSubmitting(false);
        }
    };

    const fetchAttendance = async (id) => {
        setLoading(true);
        let attendanceData = await getAttendance(id);
        attendanceData = attendanceData.map((item) => ({
            date: item.date.split("T")[0],
            status: item.status,
        }));
        setAttendance(attendanceData);
        setLoading(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setAttendance([]);
    };
    const handleViewAttendance = (id) => {
        setShowModal(true);
        fetchAttendance(id);
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
                    {/* Teacher Info */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                            <span className="text-3xl font-bold text-blue-700">
                                {teacherData.name[0]}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-blue-700">
                            {teacherData.name}
                        </h2>
                        <span className="text-gray-500 uppercase mb-1">
                            {teacherData.role}
                        </span>
                        <span className="text-gray-600">
                            {teacherData.email}
                        </span>
                        <span className="text-blue-600 font-medium mt-1">
                            Subject: {teacherData.subject}
                        </span>
                    </div>

                    {/* Student Attendance List */}
                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <span className="text-blue-600 text-xl font-semibold">
                                Loading students...
                            </span>
                        </div>
                    )}
                    {!loading && (
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-blue-700">
                                Mark Attendance
                            </h3>
                            <div className="space-y-4">
                                {students.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between border-b-2 border-gray-200 pb-2"
                                    >
                                        <span
                                            onClick={() =>
                                                handleViewAttendance(student.id)
                                            }
                                            className="font-medium hover:opacity-50 cursor-pointer"
                                        >
                                            {student.name}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                className={`px-4 py-1 rounded-lg ${
                                                    attendance[student.id] ===
                                                    "Present"
                                                        ? "bg-green-600 text-white"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                                onClick={() =>
                                                    handleToggle(
                                                        student.id,
                                                        "Present",
                                                    )
                                                }
                                            >
                                                Present
                                            </button>
                                            <button
                                                type="button"
                                                className={`px-4 py-1 rounded-lg ${
                                                    attendance[student.id] ===
                                                    "Absent"
                                                        ? "bg-red-600 text-white"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                                onClick={() =>
                                                    handleToggle(
                                                        student.id,
                                                        "Absent",
                                                    )
                                                }
                                            >
                                                Absent
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Submit Attendance"}
                            </button>
                        </div>
                    )}
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
                                className="bg-red-600 hover:bg-red-700 px-4 py-1 text-md text-white rounded-md cursor-pointer"
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

export default TeacherDashboard;
