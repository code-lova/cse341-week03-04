const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL, // Use the environment variable
  socket: {
    tls: process.env.REDIS_URL.startsWith("rediss://"), // Enable TLS if using `rediss://`
  },
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

redisClient.connect();

module.exports = redisClient;
