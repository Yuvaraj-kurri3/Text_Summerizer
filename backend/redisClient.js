import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

// Detect if Upstash (production)
const isUpstash = redisUrl.startsWith("rediss://");

const client = createClient({
  url: redisUrl,
  socket: isUpstash
    ? { tls: true }   // ✅ Upstash requires TLS
    : { tls: false }, // ✅ Local Redis MUST NOT use TLS
  disableReadyCheck: true // ✅ Upstash blocks INFO command
});

client.on("connect", () => console.log("✅ Redis Connected"));
client.on("error", (err) => console.error("❌ Redis Client Error:", err));

await client.connect();

export default client;
