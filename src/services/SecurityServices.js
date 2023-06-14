import api from "api/api";

const getAllSecurities = () => {
  return api.get("/security");
};

const getSecurityById = (id) => {
  return api.get(`/security/${id}`);
};

const createSecurity = (data) => {
  return api.post("/security", data);
};

const updateSecurity = (data) => {
  return api.put("/security", data);
};

const SecurityService = {
  getAllSecurities,
  getSecurityById,
  createSecurity,
  updateSecurity,
};

export default SecurityService;
