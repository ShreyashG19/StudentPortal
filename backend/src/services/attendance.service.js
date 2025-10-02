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

        //ISO date
        const now = new Date();
        const date = now.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata",
        });

        // HH:MM
        const time = now.toLocaleTimeString("en-GB", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
        });

        for (const record of attendanceList) {
            const { student_id, status } = record;

            const insertQuery = `
                        INSERT INTO attendance(student_id, date, time, status)
                        VALUES($1, $2, $3, $4)
                    `;
            await client.query(insertQuery, [student_id, date, time, status]);
        }
        await client.query("COMMIT");
    } catch (err) {
        await client.query("ROLLBACK");
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
};
