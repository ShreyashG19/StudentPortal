import { Pool } from "pg";
import config from "./config.js";

const pool = new Pool({
    connectionString: config.postgresUrl,
    ssl: {
        rejectUnauthorized: false, // Needed for Supabase
    },
});

async function initDB() {
    try {
        await pool.query("SELECT 1");
        console.log("Connected to Postgres via Pool!");
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
}

initDB();
export default pool;
