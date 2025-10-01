const config = {
    apiUrl: import.meta.env.VITE_API_URL,
};

// List of required environment variables
const requiredEnvVars = ["VITE_API_URL"];

// Check for missing environment variables
const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !import.meta.env[envVar],
);

if (missingEnvVars.length > 0) {
    console.error(
        `ERROR: The following required environment variables are missing: ${missingEnvVars.join(
            ", ",
        )}`,
    );
    throw new Error("Missing required environment variables");
}

export default config;
