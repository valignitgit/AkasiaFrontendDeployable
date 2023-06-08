import api from "api/api";

const getAllBrokers = () => {
  return api.get("/broker");
};

const getBrokerById = (id) => {
  return api.get(`/broker/${id}`);
};

const createBroker = (data) => {
  return api.post("/broker", data);
};

const updateBroker = (id, data) => {
  return api.put(`/broker/${id}`, data);
};

const deleteBroker = (id) => {
  return api.delete(`/broker/${id}`);
};

const BrokerService = {
  getAllBrokers,
  getBrokerById,
  createBroker,
  updateBroker,
  deleteBroker,
};

export default BrokerService;
