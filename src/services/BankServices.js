import api from "api/api";

const getAllBanks = () => {
  return api.get("/bank");
};

const getBankById = (id) => {
  return api.get(`/bank/${id}`);
};

const createBank = (data) => {
  return api.post("/bank", data);
};

const updateBank = (data) => {
  return api.put("/bank", data);
};

const deleteBank = (id) => {
  return api.delete(`/bank/${id}`);
};

const BankService = {
  getAllBanks,
  getBankById,
  createBank,
  updateBank,
  deleteBank,
};

export default BankService;
