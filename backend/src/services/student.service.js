import pool from "../config/db.js";

export const createStudent = async (user) => {
    const { id } = user;
    const sql = `INSERT INTO students (user_id, class) VALUES ($1, $2) RETURNING id, user_id, class`;
    const values = [id, "12th"];
    const result = await pool.query(sql, values);
    return result.rows[0];
};

export const getStudentByUserId = async (userId) => {
    const sql = `SELECT * FROM students WHERE user_id = $1`;
    const values = [userId];
    const result = await pool.query(sql, values);
    return result.rows[0];
};
