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

export const getAllStudents = async () => {
    const sql = `SELECT s.id, name, email, role, user_id, class, roll_number
                FROM users u
                INNER JOIN students s ON s.user_id = u.id;`;
    const result = await pool.query(sql);
    return result.rows;
};

export const getStudentById = async (id) => {
    const sql = `SELECT s.id, name, email, role, user_id, class, roll_number
                FROM users u
                INNER JOIN students s ON s.user_id = u.id
                WHERE s.id = $1`;
    const values = [id];
    const result = await pool.query(sql, values);
    return result.rows[0];
};
