import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CurrencyService from "../../services/CurrencyServices";
const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getAllCurrency = createAsyncThunk("currency/getAll", async () => {
  const res = await CurrencyService.getAllCurrency();
  return res.data;
});

export const createCurrency = createAsyncThunk(
  "currency/create",
  async (data) => {
    const res = CurrencyService.createCurrency(data);
    return res.data;
  }
);

export const getCurrencyById = createAsyncThunk("currency/get", async (id) => {
  const res = await CurrencyService.getCurrencyById(id);
  return res.data;
});

export const updateCurrency = createAsyncThunk(
  "currency/update",
  async ({ id, data }) => {
    const res = await CurrencyService.updateCurrency(id, data);
    return res.data;
  }
);

export const deleteCurrency = createAsyncThunk(
  "currency/delete",
  async (id) => {
    const res = await CurrencyService.deleteCurrency(id);
    return res.data;
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState,
  extraReducers: {
    [getAllCurrency.pending]: (state) => {
      state.loading = true;
    },
    [getAllCurrency.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAllCurrency.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createCurrency.pending]: (state) => {
      state.loading = true;
    },
    [createCurrency.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [createCurrency.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getCurrencyById.pending]: (state) => {
      state.loading = true;
    },
    [getCurrencyById.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getCurrencyById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateCurrency.pending]: (state) => {
      state.loading = true;
    },
    [updateCurrency.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [updateCurrency.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteCurrency.pending]: (state) => {
      state.loading = true;
    },
    [deleteCurrency.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [deleteCurrency.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default currencySlice.reducer;
