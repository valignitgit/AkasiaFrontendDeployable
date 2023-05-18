import api from "../api/api";
import loginApi from "../api/qaApi";
const login = (data) => {
  return loginApi.post("/auth/signin", data);
};

const logout = () => {
  return api.post("/auth/logout");
};

const changePassword = (email, data) => {
  return api.post(`user/password/change/${email}`, data);
};

const AuthServices = {
  login,
  logout,
  changePassword,
};
export default AuthServices;
