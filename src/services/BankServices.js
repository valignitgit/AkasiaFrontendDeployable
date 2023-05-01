import api from "../api/api";

const getAll = () => {
  return api.get("/bank");
};

const getById = (id) => {
  return api.get(`/bank/${id}`);
};

const create = (data) => {
  return api.post("/bank", data);
};

const update = (id, data) => {
  return api.put(`/bank/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/bank/${id}`);
};

const BankService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default BankService;
