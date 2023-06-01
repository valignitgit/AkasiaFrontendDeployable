import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL_DEV,
  headers: {
    "Content-type": "application/json",
  },
});
