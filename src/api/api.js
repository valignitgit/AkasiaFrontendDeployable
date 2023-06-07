import axios from "axios";
// import { getUserCredentials } from "../utils/ApiUtil";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL_DEV,
  headers: {
    "Content-type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2JpbGVVc2VyQHZhbGlnbml0LmNvbSIsImlhdCI6MTY4NjA0MDIyNH0.yCl0D0q_qq6p5-V80eAJjSLhm41z_n6cDUWoBew-_cI",
  },
});

// api.interceptors.request.use((config) => {
//   const { user_id, password } = getUserCredentials();

//   if (user_id && password) {
//     const authHeader = "Basic " + btoa(`${user_id}:${password}`);
//     config.headers.Authorization = authHeader;
//   }

//   return config;
// });

export default api;
