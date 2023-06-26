import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PaymentChannelService from "services/PaymentChannelServices";

const initialState = {
  data: [],
  status: "",
  message: "",
  loading: false,
  currentData: null,
  error: null,
};

export const getAllPaymentChannels = createAsyncThunk(
  "paymentChannel/getAll",
  async () => {
    try {
      const response = await PaymentChannelService.getAllPaymentChannels();
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const createPaymentChannel = createAsyncThunk(
  "paymentChannel/create",
  async (data) => {
    try {
      const response = await PaymentChannelService.createPaymentChannel(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const getPaymentChannelById = createAsyncThunk(
  "paymentChannel/get",
  async (id) => {
    try {
      const response = await PaymentChannelService.getPaymentChannelById(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const updatePaymentChannel = createAsyncThunk(
  "paymentChannel/update",
  async (data) => {
    try {
      const response = await PaymentChannelService.updatePaymentChannel(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const deletePaymentChannel = createAsyncThunk(
  "paymentChannel/delete",
  async (id) => {
    try {
      const response = await PaymentChannelService.deletePaymentChannel(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

const paymentChannelSlice = createSlice({
  name: "paymentChannel",
  initialState,
  reducers: {
    setCurrentData: (state) => {
      state.currentData = initialState.currentData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPaymentChannels.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPaymentChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data = action.payload.data;
      })
      .addCase(getAllPaymentChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPaymentChannel.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data.push(action.payload.data);
      })
      .addCase(createPaymentChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPaymentChannelById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaymentChannelById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.currentData = action.payload.data;
      })
      .addCase(getPaymentChannelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePaymentChannel.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePaymentChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        const updatedPaymentChannel = action.payload.data;
        if (updatedPaymentChannel.paymentChannel_id) {
          state.data = state.data.map((item) =>
            item.paymentChannel_id === updatedPaymentChannel.paymentChannel_id
              ? updatedPaymentChannel
              : item
          );
        }
      })
      .addCase(updatePaymentChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePaymentChannel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePaymentChannel.fulfilled, (state, action) => {
        state.loading = false;
        const { paymentChannel_id } = action.payload;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        if (paymentChannel_id) {
          state.data = state.data.filter(
            (item) => item.paymentChannel_id !== paymentChannel_id
          );
        }
      })
      .addCase(deletePaymentChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentData } = paymentChannelSlice.actions;
export default paymentChannelSlice.reducer;
