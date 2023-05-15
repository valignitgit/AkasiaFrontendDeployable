import api from "../api/qaApi";

const login = (data) => {
  return api.post("/auth/signin", data);
};

const logout = () => {
  return api.post("/auth/logout");
};
const AuthServices = {
  login,
  logout,
};
export default AuthServices;
