import mongoose from "mongoose";

const rumSchema = new mongoose.Schema({
  eventType: String,
  timestamp: Number,
  url: String,
  userAgent: String,
  data: Object,
});

export default mongoose.model("RumEvent", rumSchema);
