import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BankService from "../../services/BankServices";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getAllBank = createAsyncThunk("bank/getAllBank", async () => {
  const res = await BankService.getAll();
  return res.data;
});

export const createBank = createAsyncThunk("bank/createBank", async (data) => {
  const res = BankService.create(data);
  return res.data;
});

export const getBankById = createAsyncThunk("bank/getBankById", async (id) => {
  const res = await BankService.getById(id);
  return res.data;
});

export const updateBank = createAsyncThunk(
  "bank/update",
  async ({ id, data }) => {
    const res = await BankService.update(id, data);
    return res.data;
  }
);

export const deleteBank = createAsyncThunk("bank/deleteBank", async (id) => {
  const res = await BankService.remove(id);
  return res.data;
});

const bankSlice = createSlice({
  name: "bank",
  initialState,
  extraReducers: {
    [getAllBank.pending]: (state) => {
      state.loading = true;
    },
    [getAllBank.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAllBank.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createBank.pending]: (state) => {
      state.loading = true;
    },
    [createBank.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [createBank.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getBankById.pending]: (state) => {
      state.loading = true;
    },
    [getBankById.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getBankById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateBank.pending]: (state) => {
      state.loading = true;
    },
    [updateBank.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [updateBank.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteBank.pending]: (state) => {
      state.loading = true;
    },
    [deleteBank.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [deleteBank.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default bankSlice.reducer;
