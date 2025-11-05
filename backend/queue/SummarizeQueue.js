import { Queue } from "bullmq";
import { bullmqConnection } from "../bullmqConnection.js";

const summarizeQueue = new Queue("summarizeQueue", bullmqConnection);

console.log("✅ Summarize Queue initialized");

export default summarizeQueue;
 