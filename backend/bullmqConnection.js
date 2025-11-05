import dotenv from "dotenv";
dotenv.config();

export const bullmqConnection = {
  connection: {
    url: process.env.redis_url,
  },
};
