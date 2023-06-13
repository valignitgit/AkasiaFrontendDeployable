import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CurrencyService from "services/CurrencyServices";

const initialState = {
  data: [],
  status: "",
  message: "",
  loading: false,
  currentData: null,
  error: null,
};

export const getAllCurrencies = createAsyncThunk(
  "currency/getAll",
  async () => {
    try {
      const response = await CurrencyService.getAllCurrencies();
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const createCurrency = createAsyncThunk(
  "currency/create",
  async (data) => {
    try {
      const response = await CurrencyService.createCurrency(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const getCurrencyById = createAsyncThunk("currency/get", async (id) => {
  try {
    const response = await CurrencyService.getCurrencyById(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const updateCurrency = createAsyncThunk(
  "currency/update",
  async ({ id, data }) => {
    try {
      const response = await CurrencyService.updateCurrency(id, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const deleteCurrency = createAsyncThunk(
  "currency/delete",
  async (id) => {
    try {
      const response = await CurrencyService.deleteCurrency(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrentData: (state) => {
      state.currentData = initialState.currentData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data = action.payload.data;
      })
      .addCase(getAllCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data.push(action.payload.data);
      })
      .addCase(createCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrencyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrencyById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.currentData = action.payload.data;
      })
      .addCase(getCurrencyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        const updatedCurrency = action.payload.data;
        if (updatedCurrency.currency_id) {
          state.data = state.data.map((item) =>
            item.currency_id === updatedCurrency.currency_id
              ? updatedCurrency
              : item
          );
        }
      })
      .addCase(updateCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCurrency.fulfilled, (state, action) => {
        state.loading = false;
        const { currency_id } = action.payload;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;

        if (currency_id) {
          state.data = state.data.filter(
            (item) => item.currency_id !== currency_id
          );
        }
      })
      .addCase(deleteCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentData } = currencySlice.actions;
export default currencySlice.reducer;
