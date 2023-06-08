import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BrokerService from "services/BrokerServices";

const initialState = {
  data: [],
  loading: false,
  currentData: null,
  error: null,
};

export const getAllBrokers = createAsyncThunk("broker/getAll", async () => {
  try {
    const response = await BrokerService.getAllBrokers();
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const createBroker = createAsyncThunk("broker/create", async (data) => {
  try {
    const response = await BrokerService.createBroker(data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const getBrokerById = createAsyncThunk("broker/get", async (id) => {
  try {
    const response = await BrokerService.getBrokerById(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const updateBroker = createAsyncThunk(
  "broker/update",
  async ({ id, data }) => {
    try {
      const response = await BrokerService.updateBroker(id, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const deleteBroker = createAsyncThunk("broker/delete", async (id) => {
  try {
    const response = await BrokerService.deleteBroker(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

const brokerSlice = createSlice({
  name: "broker",
  initialState,
  reducers: {
    setCurrentData: (state) => {
      state.currentData = initialState.currentData;
    },
  },
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
        state.data.push(action.payload);
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
        state.currentData = action.payload;
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
        const updatedBroker = action.payload;
        if (updatedBroker.broker_id) {
          state.data = state.data.map((item) =>
            item.broker_id === updatedBroker.broker_id ? updatedBroker : item
          );
        }
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
        const { broker_id } = action.payload;
        if (broker_id) {
          state.data = state.data.filter(
            (item) => item.broker_id !== broker_id
          );
        }
      })
      .addCase(deleteBroker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentData } = brokerSlice.actions;
export default brokerSlice.reducer;
