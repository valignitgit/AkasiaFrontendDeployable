import api from "api/api";

const getAllPortfolios = () => {
  return api.get("/portfolio");
};

const getPortfolioById = (id) => {
  return api.get(`/portfolio/${id}`);
};

const createPortfolio = (data) => {
  return api.post("/portfolio", data);
};

const updatePortfolio = (data) => {
  return api.patch("/portfolio", data);
};

const deletePortfolio = (id) => {
  return api.delete(`/portfolio/${id}`);
};

const PortfolioService = {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};

export default PortfolioService;
