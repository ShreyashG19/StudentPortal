import pool from "../config/db.js";

export const getAttendanceByStudentId = async (studentId) => {
    const sql = `SELECT * FROM attendance WHERE student_id = $1`;
    const values = [studentId];
    const result = await pool.query(sql, values);
    return result.rows;
};

export const markAllAttendance = async (attendanceList) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        for (const record of attendanceList) {
            const { student_id, status } = record;

            const date = new Date().toISOString().split("T")[0];

            const insertQuery = `
                        INSERT INTO attendance(student_id, date, status)
                        VALUES($1, $2, $3)
                    `;
            await client.query(insertQuery, [student_id, date, status]);
        }
        await client.query("COMMIT");
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
};
