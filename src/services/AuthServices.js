import api from "../api/qaApi";
const login = (data) => {
  return api.post("/user/login", data);
};

const logout = () => {
  return api.post("/auth/logout");
};

const changePassword = (email, data) => {
  return api.post(`auth/password/change/${email}`, data);
};

const AuthServices = {
  login,
  logout,
  changePassword,
};
export default AuthServices;
