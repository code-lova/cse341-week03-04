const express = require("express");
const passport = require("passport");
const createHttpError = require("http-errors");
const authenticateUser = require("../middleware/authMiddleware");
const { addToBlacklist } = require("../middleware/tokenBlacklist");
const router = express.Router();

// Redirect to Google authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      //return res.status(401).json({ message: "OAuth authentication failed" });
      return next(createHttpError(409, "OAuth authentication failed"));
    }

    // Send token to client
    res.status(200).json({
      message: "Authentication successful",
      user: req.user.user,
      token: req.user.token,
    });
  }
);

router.post("/logout", authenticateUser, async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  // Get token expiration time from JWT payload
  const decoded = req.user;
  const expiresIn = Math.floor(decoded.exp - Date.now() / 1000); // Convert to seconds

  if (expiresIn > 0) {
    await addToBlacklist(token, expiresIn);
  }

  res.status(200).json({
    message: "Logout successful. Token is now invalid.",
  });
});

module.exports = router;
