import api from "api/api";

const getAllPaymentChannels = () => {
  return api.get("/paymentchannel");
};

const getPaymentChannelById = (id) => {
  return api.get(`/paymentchannel/${id}`);
};

const createPaymentChannel = (data) => {
  return api.post("/paymentchannel", data);
};

const updatePaymentChannel = (data) => {
  return api.put("/paymentchannel", data);
};

const deletePaymentChannel = (id) => {
  return api.delete(`/paymentchannel/${id}`);
};

const PaymentChannelService = {
  getAllPaymentChannels,
  getPaymentChannelById,
  createPaymentChannel,
  updatePaymentChannel,
  deletePaymentChannel,
};

export default PaymentChannelService;
