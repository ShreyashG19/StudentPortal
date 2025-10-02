import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getAllStudents, getStudent } from "../services/studentService";
import { useToast } from "../context/ToastContext";
import {
    getAttendance,
    markAttendance,
    getLastSubmittedTime,
} from "../services/attendanceService";
import {
    User,
    BookOpen,
    AtSign,
    Mail,
    Book,
    Eye,
    CheckCircle,
    X,
    CalendarDays,
    Clock,
    UserCheck,
    Users,
} from "lucide-react"; // lucide icons

function TeacherDashboard() {
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [attendanceLoading, setAttendanceLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentLoading, setStudentLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [lastSubmitted, setLastSubmitted] = useState(getLastSubmittedTime());
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

    // Reset attendance state when modal closes
    useEffect(() => {
        if (!showModal && students.length > 0) {
            // Re-initialize attendance to "Present" for all students
            const initialAttendance = students.reduce((acc, student) => {
                acc[student.id] = "Present";
                return acc;
            }, {});
            setAttendance(initialAttendance);
        }
    }, [showModal, students]);

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
            setLastSubmitted(getLastSubmittedTime());
            setSubmitting(false);
        } catch (error) {
            showError(error.message);
            setSubmitting(false);
        }
    };

    const fetchAttendance = async (id) => {
        setAttendanceLoading(true);
        try {
            let attendanceData = await getAttendance(id);
            attendanceData = attendanceData.map((item) => {
                return {
                    date: item.date.split("T")[0],
                    time: item.time,
                    status: item.status,
                };
            });
            setAttendanceRecords(attendanceData);
        } catch (err) {
            showError(err.message || "Failed to load attendance");
            setAttendanceRecords([]);
        } finally {
            setAttendanceLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setAttendanceRecords([]);
        setSelectedStudent(null);
        setStudentLoading(false);
        setAttendanceLoading(false);
    };

    const handleViewAttendance = async (id) => {
        setShowModal(true);
        // fetch student info first
        try {
            setStudentLoading(true);
            const student = await getStudent(id);
            setSelectedStudent(student);
        } catch (err) {
            showError(err.message || "Failed to load student info");
            setSelectedStudent(null);
        } finally {
            setStudentLoading(false);
        }

        // then fetch attendance
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
                            <User className="w-12 h-12 text-blue-700" />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                            {teacherData.name}
                        </h2>
                        <span className="text-gray-500 uppercase mb-1 flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {teacherData.role}
                        </span>
                        <span className="text-gray-600 flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {teacherData.email}
                        </span>
                        <span className="text-blue-600 font-medium mt-1 flex items-center gap-1">
                            <Book className="w-4 h-4" />
                            Subject: {teacherData.subject}
                        </span>
                    </div>

                    {/* Student Attendance List */}
                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <span className="text-blue-600 text-xl font-semibold flex items-center gap-2">
                                <Users className="w-6 h-6" />
                                Loading students...
                            </span>
                        </div>
                    )}
                    {!loading && (
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center gap-2">
                                <UserCheck className="w-5 h-5" />
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
                                            className="font-medium hover:opacity-50 cursor-pointer flex items-center gap-1"
                                        >
                                            <User className="w-4 h-4 text-blue-600" />
                                            {student.name}
                                            <Eye
                                                className="w-4 h-4 text-gray-400 ml-2"
                                                title="View Attendance"
                                            />
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                className={`px-4 py-1 rounded-lg flex items-center gap-1 ${
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
                                                className={`px-4 py-1 rounded-lg flex items-center gap-1 ${
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
                            {/* Last submitted date text */}
                            <div className="flex justify-start mt-6 items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-500 font-medium text-sm">
                                    Last submitted time : {lastSubmitted}
                                </span>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                <CheckCircle className="w-5 h-5" />
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
                            <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                                <CalendarDays className="w-5 h-5" />
                                Attendance
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="bg-red-600 hover:bg-red-700 px-4 py-1 text-md text-white rounded-md cursor-pointer flex items-center gap-1"
                                aria-label="Close"
                            >
                                <X className="w-4 h-4" />
                                Close
                            </button>
                        </div>
                        {attendanceLoading ? (
                            <div className="text-center py-8 text-gray-500">
                                Loading attendance...
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 p-3 border-2 border-gray-300 rounded-md bg-gray-50">
                                    {studentLoading ? (
                                        <div className="text-gray-500">
                                            Loading student...
                                        </div>
                                    ) : selectedStudent ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                <User className="w-6 h-6 text-blue-700" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-blue-700">
                                                    {selectedStudent.name}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Roll No:{" "}
                                                    {
                                                        selectedStudent.roll_number
                                                    }
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Class:{" "}
                                                    {selectedStudent.class}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Email:{" "}
                                                    {selectedStudent.email}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-500">
                                            No student selected.
                                        </div>
                                    )}
                                </div>

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
                                        {attendanceRecords.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    className="py-4 text-center text-gray-400"
                                                >
                                                    No attendance data.
                                                </td>
                                            </tr>
                                        ) : (
                                            attendanceRecords.map(
                                                (item, idx) => (
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
                                                ),
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default TeacherDashboard;
