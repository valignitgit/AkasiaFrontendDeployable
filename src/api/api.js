import axios from "axios";
import { getUserCredentials } from "../utils/ApiUtil";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL_DEV,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { user_id, password } = getUserCredentials();

  if (user_id && password) {
    const authHeader = "Basic " + btoa(`${user_id}:${password}`);
    config.headers.Authorization = authHeader;
  }

  return config;
});

export default api;
