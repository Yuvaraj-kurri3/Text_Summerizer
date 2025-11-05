 import * as BullMQ from "bullmq";
import dotenv from "dotenv";
dotenv.config();

const { Worker } = BullMQ;
const connection = { connection: { url: process.env.redis_url } };

const worker = new Worker("summarizeQueue",async (job) => {
    console.log(`🧠 Summarizing for user ${job.data.userid}`);
     const text = job.data && job.data.summary || "";
    await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate heavy task

    const summary = text.length > 100 ? text.substring(0, 100) + "... (summary)" : text + " (short summary)";

    console.log("✅ Summary completed for job:", job.id);
    return summary;
  },
  connection
);

worker.on("completed", (job, result) => {
  console.log(`🎉 Job ${job.id} completed successfully!`);
  console.log("Result:", result);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed: ${err.message}`);
});

console.log("🚀 Worker is running for queue: summarizeQueue");
