import axios from "axios";

export default axios.create({
  baseURL: "http://165.232.177.225:9091/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});
