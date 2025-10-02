import dotenv from "dotenv";
dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    postgresUrl: process.env.POSTGRES_URL,
    jwtSecret: process.env.JWT_SECRET,
};

// List of required environment variables
const requiredEnvVars = ["POSTGRES_URL", "JWT_SECRET", "PORT"];

// check misssing
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error(
        `ERROR: The following required environment variables are missing: ${missingEnvVars.join(
            ", ",
        )}`,
    );
    process.exit(1); //terminate
}

export default config;
