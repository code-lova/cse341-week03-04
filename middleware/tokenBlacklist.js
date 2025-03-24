const redisClient = require("../config/redisClient");

// Function to blacklist a token
const addToBlacklist = async (token, expiresIn) => {
  try {
    await redisClient.set(token, "blacklisted", {
      EX: expiresIn, // Automatically delete after token expiry
    });
  } catch (error) {
    console.error("❌ Error blacklisting token:", error);
  }
};

// Function to check if a token is blacklisted
const isTokenBlacklisted = async (token) => {
  const result = await redisClient.get(token);
  return result === "blacklisted";
};

module.exports = { addToBlacklist, isTokenBlacklisted };
