import api from "api/api";

const getAllOmniBusAccounts = () => {
  return api.get("/omniBusAccount");
};

const getOmniBusAccountById = (id) => {
  return api.get(`/omniBusAccount/${id}`);
};

const createOmniBusAccount = (data) => {
  return api.post("/omniBusAccount", data);
};

const updateOmniBusAccount = (data) => {
  return api.put("/omniBusAccount", data);
};

const deleteOmniBusAccount = (id) => {
  return api.delete(`/omniBusAccount/${id}`);
};

const OmniBusAccountService = {
  getAllOmniBusAccounts,
  getOmniBusAccountById,
  createOmniBusAccount,
  updateOmniBusAccount,
  deleteOmniBusAccount,
};

export default OmniBusAccountService;
