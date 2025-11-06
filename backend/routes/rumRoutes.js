import express from "express";
import RumEvent from "../models/RumModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await RumEvent.create(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error("RUM error:", err.message);
    res.sendStatus(500);
  }
});

export default router;
