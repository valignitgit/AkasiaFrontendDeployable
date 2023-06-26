import api from "api/api";

const getAllPaymentChannels = () => {
  return api.get("/paymentChannel");
};

const getPaymentChannelById = (id) => {
  return api.get(`/paymentChannel/${id}`);
};

const createPaymentChannel = (data) => {
  return api.post("/paymentChannel", data);
};

const updatePaymentChannel = (data) => {
  return api.put("/paymentChannel", data);
};

const deletePaymentChannel = (id) => {
  return api.delete(`/paymentChannel/${id}`);
};

const PaymentChannelService = {
  getAllPaymentChannels,
  getPaymentChannelById,
  createPaymentChannel,
  updatePaymentChannel,
  deletePaymentChannel,
};

export default PaymentChannelService;
