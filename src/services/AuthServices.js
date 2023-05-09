import api from "../api/api";

const login = (email, password) => {
  return api.post("/login/dashboard");
};

const AuthServices = {
  login,
};
export default AuthServices;
