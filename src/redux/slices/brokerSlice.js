import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BrokerService from "../../services/BrokerServices";
const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getAllBrokers = createAsyncThunk("broker/getAll", async () => {
  const res = await BrokerService.getAllBrokers();
  return res.data;
});

export const createBroker = createAsyncThunk("broker/create", async (data) => {
  const res = BrokerService.createBroker(data);
  return res.data;
});

export const getBrokerById = createAsyncThunk("broker/get", async (id) => {
  const res = await BrokerService.getBrokerById(id);
  return res.data;
});

export const updateBroker = createAsyncThunk(
  "broker/update",
  async ({ id, data }) => {
    const res = await BrokerService.updateBroker(id, data);
    return res.data;
  }
);

export const deleteBroker = createAsyncThunk("broker/delete", async (id) => {
  const res = await BrokerService.deleteBroker(id);
  return res.data;
});

const brokerSlice = createSlice({
  name: "broker",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrokers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBrokers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllBrokers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBroker.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBroker.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createBroker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBrokerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrokerById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBrokerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBroker.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBroker.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateBroker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBroker.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBroker.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteBroker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brokerSlice.reducer;
