import api from "api/api";

const getAllCountries = () => {
  return api.get("/country");
};

const getCountryById = (id) => {
  return api.get(`/country/${id}`);
};

const createCountry = (data) => {
  return api.post("/country", data);
};

const updateCountry = (id, data) => {
  return api.put(`/country/${id}`, data);
};

const deleteCountry = (id) => {
  return api.delete(`/country/${id}`);
};

const CountryService = {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
};

export default CountryService;
