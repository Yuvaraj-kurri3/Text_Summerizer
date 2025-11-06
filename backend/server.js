import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import crypto from "crypto";
import connectDB from "./config/db.js";
import userroutes from "./routes/userroute.js";
import summarizedtextroutes from "./routes/summerizedtextRoute.js";
import middlewaresroute from "./routes/middlewareroute.js";
import rumRoutes from "./routes/rumRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();

/* ------------------------------ ✅ METRICS ------------------------------ */

// ✅ Request/Response Tracing
app.use((req, res, next) => {
  const requestId = crypto.randomUUID();
  req.requestId = requestId;
  const start = Date.now();

  console.log("🟢 [TRACE START]", {
    requestId,
    method: req.method,
    url: req.originalUrl,
  });

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log("🔵 [TRACE END]", {
      requestId,
      status: res.statusCode,
      durationMs: duration,
    });
  });

  next();
});

// ✅ Correlation-ID (Frontend → Backend)
app.use((req, res, next) => {
  const cid = req.headers["x-correlation-id"] || crypto.randomUUID();
  req.correlationId = cid;

  console.log("🔗 [CORRELATION]", {
    requestId: req.requestId,
    correlationId: cid,
  });

  next();
});

 let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  next();
});
setInterval(() => {
  console.log(`📈 [THROUGHPUT] ${requestCount} req/sec`);
  requestCount = 0;
}, 1000);

 setInterval(() => {
  const memory = process.memoryUsage();
  console.log("[MEMORY]", {
    rss: (memory.rss / 1024 / 1024).toFixed(2) + "MB",
    heapUsed: (memory.heapUsed / 1024 / 1024).toFixed(2) + "MB",
  });
}, 8000);

 
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost",
  "https://text-summerizer-iota.vercel.app",
];

app.use(
  cors({
    origin: (origin, cb) =>
      cb(null, !origin || allowedOrigins.includes(origin)),
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization,x-correlation-id",
  })
);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

 
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

connectDB();

 app.use("/api/user", userroutes);
app.use("/api/summarize", summarizedtextroutes);
app.use("/api/middleware", middlewaresroute);
app.use("/api/rum", rumRoutes);

app.get("/health", (req, res) => res.send("✅ Backend running"));

 
let errorCount = 0;

app.use((err, req, res, next) => {
  errorCount++;
  console.log("❌ [ERROR]", {
    requestId: req.requestId,
    correlationId: req.correlationId,
    msg: err.message,
  });

  res.status(500).json({ error: "Internal Error" });
});

setInterval(() => {
  console.log(`🚨 [ERROR RATE] ${errorCount} errors in 60s`);
  errorCount = 0;
}, 60000);

app.listen(3000, () => console.log("✅ Server running on port 3000"));
