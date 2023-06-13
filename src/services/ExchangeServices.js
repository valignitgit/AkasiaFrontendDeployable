import api from "../api/api";

const getAllExchange = () => {
  return api.get("/exchange");
};

const getExchangeById = (id) => {
  return api.get(`/exchange/${id}`);
};

const createExchange = (data) => {
  return api.post("/exchange", data);
};

const updateExchange = (data) => {
  return api.put("/exchange", data);
};

const deleteExchange = (id) => {
  return api.delete(`/exchange/${id}`);
};

const ExchangeService = {
  getAllExchange,
  getExchangeById,
  createExchange,
  updateExchange,
  deleteExchange,
};

export default ExchangeService;
