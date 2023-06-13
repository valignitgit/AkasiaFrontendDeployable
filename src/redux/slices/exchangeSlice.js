import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExchangeService from "services/ExchangeServices";

const initialState = {
  data: [],
  status: "",
  message: "",
  currentData: null,
  loading: false,
  error: null,
};

export const getAllExchanges = createAsyncThunk("exchange/getAll", async () => {
  try {
    const response = await ExchangeService.getAllExchange();
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const createExchange = createAsyncThunk(
  "exchange/create",
  async (data) => {
    try {
      const response = await ExchangeService.createExchange(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);
export const getExchangeById = createAsyncThunk(
  "exchange/getExchangeById",
  async (id) => {
    try {
      const response = await ExchangeService.getExchangeById(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);
export const updateExchange = createAsyncThunk(
  "exchange/update",
  async (data) => {
    try {
      const response = await ExchangeService.updateExchange(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);
export const deleteExchange = createAsyncThunk(
  "exchange/delete",
  async (id) => {
    try {
      const response = await ExchangeService.deleteExchange(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

const exchangeReducer = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setCurrentData: (state) => {
      state.currentData = initialState.currentData;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllExchanges.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllExchanges.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data = action.payload.data;
      })
      .addCase(getAllExchanges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createExchange.pending, (state) => {
        state.loading = true;
      })
      .addCase(createExchange.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data.push(action.payload.data);
      })
      .addCase(createExchange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getExchangeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExchangeById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.currentData = action.payload.data;
      })

      .addCase(getExchangeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateExchange.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExchange.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;

        const updatedExchange = action.payload.data;
        if (updatedExchange.exchange_id) {
          state.data = state.data.map((item) =>
            item.exchange_id === updatedExchange.exchange_id
              ? updatedExchange
              : item
          );
        }
      })
      .addCase(updateExchange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteExchange.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExchange.fulfilled, (state, action) => {
        state.loading = false;
        const { exchange_id } = action.payload;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;

        if (exchange_id) {
          state.data = state.data.filter(
            (item) => item.exchange_id !== exchange_id
          );
        }
      })
      .addCase(deleteExchange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentData } = exchangeReducer.actions;
export default exchangeReducer.reducer;
