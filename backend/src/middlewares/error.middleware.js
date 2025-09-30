import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const errorHandler = (error, req, res, next) => {
    console.log("=========================");
    console.log(error.stack);
    console.log("=========================");
    if (error instanceof ApiError) {
        return res
            .status(error.statusCode)
            .json(new ApiResponse(error.statusCode, error.message));
    }
    const statusCode = 500;
    res.status(statusCode).json(new ApiResponse(statusCode, error.message));
};

export default errorHandler;
