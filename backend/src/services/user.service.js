import pool from "../config/db.js";

export const createUser = async (user) => {
    const { name, email, password, role } = user;
    const sql = `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`;
    const values = [name, email, password, role];
    const result = await pool.query(sql, values);
    return result.rows[0];
};

export const createStudent = async (user) => {
    const { id } = user;
    const sql = `INSERT INTO students (user_id, class) VALUES ($1, $2) RETURNING id, user_id, class`;
    const values = [id, "12th"];
    const result = await pool.query(sql, values);
    return result.rows[0];
};

export const createTeacher = async (user) => {
    const { id } = user;
    const sql = `INSERT INTO teachers (user_id, subject) VALUES ($1, $2) RETURNING id, user_id, subject`;

    const values = [id, "English"];
    const result = await pool.query(sql, values);
    return result.rows[0];
};

export const getUserByEmail = async (email) => {
    const sql = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await pool.query(sql, values);
    return result.rows[0];
};

export const getStudentByUserId = async (userId) => {
    const sql = `SELECT * FROM students WHERE user_id = $1`;
    const values = [userId];
    const result = await pool.query(sql, values);
    return result.rows[0];
};

export const getTeacherByUserId = async (userId) => {
    const sql = `SELECT * FROM teachers WHERE user_id = $1`;
    const values = [userId];
    const result = await pool.query(sql, values);
    return result.rows[0];
};
