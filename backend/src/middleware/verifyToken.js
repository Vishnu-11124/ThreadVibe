import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const verifyToken = asyncHandler(async (req, res, next) => {

    // 1️⃣ Get token
    const token =
        req.cookies?.token ||
        req.header("Authorization")?.replace("Bearer ", "");
    console.log(token)
    // 2️⃣ Check token exists
    if (!token) {
        throw new ApiError(401, "Access denied. No token provided");
    }

    try {
        // 3️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4️⃣ Attach to request
        req.user = decoded;

        next();

    } catch (error) {

        // 🔥 Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token expired. Please login again");
        }

        if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Invalid token");
        }

        // fallback
        throw new ApiError(401, "Token verification failed");
    }
});


export default verifyToken;
