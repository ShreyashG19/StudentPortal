import pool from "../config/db.js";

export const createUser = async (user) => {
    const { name, email, password, role } = user;
    const sql = `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`;
    const values = [name, email, password, role];
    const result = await pool.query(sql, values);
    return result.rows[0];
};

export const getUserByEmail = async (email) => {
    const sql = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await pool.query(sql, values);
    return result.rows[0];
};
