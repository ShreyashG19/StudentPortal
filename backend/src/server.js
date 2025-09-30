import app from "./app.js";
import config from "./config/config.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

export default startServer;
