class ApiError extends Error {
    constructor(statusCode, message) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
