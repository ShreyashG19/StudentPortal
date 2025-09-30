import pool from "../config/db.js";

export const createTeacher = async (user) => {
    const { id } = user;
    const sql = `INSERT INTO teachers (user_id, subject) VALUES ($1, $2) RETURNING id, user_id, subject`;

    const values = [id, "English"];
    const result = await pool.query(sql, values);
    return result.rows[0];
};

export const getTeacherByUserId = async (userId) => {
    const sql = `SELECT * FROM teachers WHERE user_id = $1`;
    const values = [userId];
    const result = await pool.query(sql, values);
    return result.rows[0];
};
