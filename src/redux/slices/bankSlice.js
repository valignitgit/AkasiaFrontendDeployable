import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BankService from "services/BankServices";

const initialState = {
  data: [],
  status: "",
  message: "",
  loading: false,
  currentData: null,
  error: null,
};

export const getAllBanks = createAsyncThunk("bank/getAll", async () => {
  try {
    const response = await BankService.getAllBanks();
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const createBank = createAsyncThunk("bank/create", async (data) => {
  try {
    const response = await BankService.createBank(data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const getBankById = createAsyncThunk("bank/get", async (id) => {
  try {
    const response = await BankService.getBankById(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const updateBank = createAsyncThunk("bank/update", async (data) => {
  try {
    const response = await BankService.updateBank(data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const deleteBank = createAsyncThunk("bank/delete", async (id) => {
  try {
    const response = await BankService.deleteBank(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setCurrentData: (state) => {
      state.currentData = initialState.currentData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBanks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data = action.payload.data;
      })
      .addCase(getAllBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBank.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data.push(action.payload.data);
      })
      .addCase(createBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBankById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBankById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.currentData = action.payload.data;
      })
      .addCase(getBankById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBank.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        const updatedBank = action.payload.data;
        if (updatedBank.bank_id) {
          state.data = state.data.map((item) =>
            item.bank_id === updatedBank.bank_id ? updatedBank : item
          );
        }
      })
      .addCase(updateBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBank.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        const { bank_id } = action.payload;
        if (bank_id) {
          state.data = state.data.filter((item) => item.bank_id !== bank_id);
        }
      })
      .addCase(deleteBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentData } = bankSlice.actions;
export default bankSlice.reducer;
