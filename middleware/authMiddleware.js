const jwt = require("jsonwebtoken");
require("dotenv").config();
const createHttpError = require("http-errors");
const { isTokenBlacklisted } = require("../middleware/tokenBlacklist");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createHttpError(401, "Unauthorized: No token provided. Please log in using Google.", {
        details: [
          "Visit the login link below in your browser to authenticate.",
          "http://localhost:8080/api/auth/google",
        ],
      })
    );
  }

  const token = authHeader.split(" ")[1];

  // Check if token is blacklisted
  if (await isTokenBlacklisted(token)) {
    return next(createHttpError(401, "Unauthorized: Token has been revoked. Please log in again."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    return next(
      createHttpError(401, "Unauthorized: Invalid or expired token. Please log in again.", {
        details: [
          "Use the Google login link in your browser to refresh your session.",
          "http://localhost:8080/api/auth/google",
        ],
      })
    );
  }
};

module.exports = authenticateUser;
