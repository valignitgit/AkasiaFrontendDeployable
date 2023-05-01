import api from "../api/api";

const getAllPortfolioSecurity = (portfolio_id) => {
    return api.get(`/portfolio_security/portfolio${portfolio_id}`);
};

const getPortfolioSecurityById = (portfolio_id, security_id) => {
    return api.get(
        `/portfolio_security/portfolio/${portfolio_id}/security/${security_id}`
    );
};

const createPortfolioSecurity = (portfolio_id, security_id, data) => {
    return api.post(
        `/portfolio_security/portfolio/${portfolio_id}/security/${security_id}`,
        data
    );
};

const updatePortfolioSecurity = (portfolio_id, security_id, data) => {
    return api.patch(
        `/portfolio_security/portfolio/${portfolio_id}/security/${security_id}`,
        data
    );
};

const deletePortfolioSecurity = (portfolio_id, security_id) => {
    return api.delete(
        `/portfolio_security/portfolio/${portfolio_id}/security/${security_id}`
    );
};

const PortfolioSecurityService = {
    getAllPortfolioSecurity,
    getPortfolioSecurityById,
    createPortfolioSecurity,
    updatePortfolioSecurity,
    deletePortfolioSecurity,
};

export default PortfolioSecurityService;
