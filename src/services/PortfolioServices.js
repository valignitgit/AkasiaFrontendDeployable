import api from "../api/api";

const getAllPortfolio = () => {
    return api.get("/portfolio");
};

const getPortfolioById = (id) => {
    return api.get(`/portfolio/${id}`);
};

const createPortfolio = (data) => {
    return api.post("/portfolio", data);
};

const updatePortfolio = (id, data) => {
    return api.patch(`/portfolio/${id}`, data);
};

const deletePortfolio = (id) => {
    return api.delete(`/portfolio/${id}`);
};

const PortfolioService = {
    getAllPortfolio,
    getPortfolioById,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
};

export default PortfolioService;
