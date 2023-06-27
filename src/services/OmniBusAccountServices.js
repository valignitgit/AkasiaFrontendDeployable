import api from "api/api";

const getAllOmniBusAccounts = () => {
  return api.get("/omnibusaccount");
};

const getOmniBusAccountById = (id) => {
  return api.get(`/omnibusaccount/${id}`);
};

const createOmniBusAccount = (data) => {
  return api.post("/omnibusaccount", data);
};

const updateOmniBusAccount = (data) => {
  return api.put("/omnibusaccount", data);
};

const deleteOmniBusAccount = (id) => {
  return api.delete(`/omnibusaccount/${id}`);
};

const OmniBusAccountService = {
  getAllOmniBusAccounts,
  getOmniBusAccountById,
  createOmniBusAccount,
  updateOmniBusAccount,
  deleteOmniBusAccount,
};

export default OmniBusAccountService;
