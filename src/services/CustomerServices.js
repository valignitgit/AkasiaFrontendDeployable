import api from "api/api";

const getAllCustomers = () => {
  return api.get("/customer");
};

const getCustomerById = (id) => {
  return api.get(`/customer/${id}`);
};

const updateCustomer = (data) => {
  return api.put("/customer", data);
};

const CustomerService = {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
};

export default CustomerService;
