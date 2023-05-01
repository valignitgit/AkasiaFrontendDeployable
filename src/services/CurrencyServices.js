import api from "../api/api";

const getAllCurrency = () => {
    return api.get("/currency");
};

const getCurrencyById = (id) => {
    return api.get(`/currency/${id}`);
};

const createCurrency = (data) => {
    return api.post("/currency", data);
};

const updateCurrency = (id, data) => {
    return api.patch(`/currency/${id}`, data);
};

const deleteCurrency = (id) => {
    return api.delete(`/currency/${id}`);
};

const CurrencyService = {
    getAllCurrency,
    getCurrencyById,
    createCurrency,
    updateCurrency,
    deleteCurrency,
};

export default CurrencyService;
