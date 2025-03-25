const jwt = require("jsonwebtoken");
require("dotenv").config();
const createHttpError = require("http-errors");
const { isTokenBlacklisted } = require("../middleware/tokenBlacklist");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createHttpError(401, "Unauthorized: No token provided. Please log in using Google.", {
        details: ["Visit the Google OAuth Login link above in your browser to authenticate."],
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
          "Use the Google OAuth Login link above, in your browser to refresh your session.",
        ],
      })
    );
  }
};

module.exports = authenticateUser;
