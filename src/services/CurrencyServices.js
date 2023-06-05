import api from "../api/api";

const getAllCurrencies = () => {
  return api.get("/currency");
};

const getCurrencyById = (id) => {
  return api.get(`/currency/${id}`);
};

const createCurrency = (data) => {
  return api.post("/currency", data);
};

const updateCurrency = (id, data) => {
  return api.put(`/currency/${id}`, data);
};

const deleteCurrency = (id) => {
  return api.delete(`/currency/${id}`);
};

const CurrencyService = {
  getAllCurrencies,
  getCurrencyById,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};

export default CurrencyService;
