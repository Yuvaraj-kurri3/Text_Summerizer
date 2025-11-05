import { createClient } from "redis";
import {config} from 'dotenv'

config();
const client = createClient({
  url: process.env.redis_url,
  socket: {
    tls: true,
  },
  disableReadyCheck: true, // ✅ This disables the 'INFO' check
});
client.on("connect", () => console.log("✅ Redis client connected"));
client.on("error", (err) => console.error("❌ Redis Client Error:", err));

async function connectRedis() {
  try {
    await client.connect();
    console.log("🚀 Redis connection successful!");
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
  }
}

connectRedis();

export default client;
