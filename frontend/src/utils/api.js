import axios from "axios";
import crypto from "crypto-js";

const api = axios.create({
  baseURL: "https://text-summerizer-vs2o.onrender.com/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers["x-correlation-id"] = crypto.lib.WordArray.random(16).toString();
  return config;
});
 

export default api;
