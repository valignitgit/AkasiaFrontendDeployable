import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ExchangeService from "../../services/ExchangeServices";

const initialState = {
  data: [],
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
  async ({ id, data }) => {
    try {
      const response = await ExchangeService.updateExchange(id, data);
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

export const resetExchangeState = createAsyncThunk(
  "country/reset",
  async () => {
    return [];
  }
);

const exchangeReducer = createSlice({
  name: "exchange",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllExchanges.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllExchanges.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
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
        // state.data.push(action.payload);
        state.data = action.payload;
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
        state.data = action.payload;

        // const { exchange_id } = action.payload;
        // if (exchange_id) {
        //   const exchangeItem = state.data.find(
        //     (item) => item.exchange_id === exchange_id
        //   );
        //   state.data = exchangeItem;
        // }
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
        state.data = action.payload;
        // const updatedExchange = action.payload;

        // if (updatedExchange.exchange_id) {
        //   state.data = state.data.map((item) =>
        //     item.exchange_id === updatedExchange.exchange_id
        //       ? updatedExchange
        //       : item
        //   );
        // }
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
        state.data = action.payload;

        // const { exchange_id } = action.payload;
        // if (exchange_id) {
        //   state.data = state.data.filter(
        //     (item) => item.exchange_id !== exchange_id
        //   );
        // }
      })
      .addCase(deleteExchange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetExchangeState.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetExchangeState.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(resetExchangeState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default exchangeReducer.reducer;
