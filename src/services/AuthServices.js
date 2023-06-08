import api from "api/api";
const login = (data) => {
  return api.post("/user/login", data);
};

const logout = () => {
  return api.post("/user/logout");
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
