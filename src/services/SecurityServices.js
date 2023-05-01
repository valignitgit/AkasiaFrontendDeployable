import api from "../api/api";

const getAllSecurity = () => {
    return api.get("/security");
};

const getSecurityById = (id) => {
    return api.get(`/security/${id}`);
};

const createSecurity = (data) => {
    return api.post("/security", data);
};

const updateSecurity = (id, data) => {
    return api.put(`/security/${id}`, data);
};

const SecurityService = {
    getAllSecurity,
    getSecurityById,
    createSecurity,
    updateSecurity,
};

export default SecurityService;
