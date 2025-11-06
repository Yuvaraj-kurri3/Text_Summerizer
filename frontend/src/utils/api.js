import axios from "axios";
import crypto from "crypto-js";

const api = axios.create({
  baseURL: "https://text-summerizer-vs2o.onrender.com/api",
  withCredentials: true,
});

 const correlationId = window.crypto?.randomUUID?.() ||`${Date.now()}-${Math.random()}`;
 console.log(correlationId);
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["x-correlation-id"] = correlationId;
  config.withCredentials = true;
  return config;
});
export default api;
