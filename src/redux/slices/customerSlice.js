import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomerService from "services/CustomerServices";

const initialState = {
  data: [],
  loading: false,
  currentData: null,
  error: null,
};

export const getAllCustomers = createAsyncThunk("customer/getAll", async () => {
  try {
    const response = await CustomerService.getAllCustomers();
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const getCustomerById = createAsyncThunk("customer/get", async (id) => {
  try {
    const response = await CustomerService.getCustomerById(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const updateCustomer = createAsyncThunk(
  "customer/update",
  async (data) => {
    try {
      const response = await CustomerService.updateCustomer(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCurrentData: (state) => {
      state.currentData = initialState.currentData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data = action.payload.data;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCustomerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.currentData = action.payload.data;
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        const updatedCustomer = action.payload.data;
        if (updatedCustomer.customer_id) {
          state.data = state.data.map((item) =>
            item.customer_id === updatedCustomer.customer_id
              ? updatedCustomer
              : item
          );
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentData } = customerSlice.actions;
export default customerSlice.reducer;
