import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OmniBusAccountService from "services/OmniBusAccountServices";

const initialState = {
  data: [],
  status: "",
  message: "",
  loading: false,
  currentData: null,
  error: null,
};

export const getAllOmniBusAccounts = createAsyncThunk(
  "omniBusAccount/getAll",
  async () => {
    try {
      const response = await OmniBusAccountService.getAllOmniBusAccounts();
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const createOmniBusAccount = createAsyncThunk(
  "omniBusAccount/create",
  async (data) => {
    try {
      const response = await OmniBusAccountService.createOmniBusAccount(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const getOmniBusAccountById = createAsyncThunk(
  "omniBusAccount/get",
  async (id) => {
    try {
      const response = await OmniBusAccountService.getOmniBusAccountById(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const updateOmniBusAccount = createAsyncThunk(
  "omniBusAccount/update",
  async (data) => {
    try {
      const response = await OmniBusAccountService.updateOmniBusAccount(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const deleteOmniBusAccount = createAsyncThunk(
  "omniBusAccount/delete",
  async (id) => {
    try {
      const response = await OmniBusAccountService.deleteOmniBusAccount(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

const omniBusAccountSlice = createSlice({
  name: "omniBusAccount",
  initialState,
  reducers: {
    setCurrentData: (state) => {
      state.currentData = initialState.currentData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOmniBusAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOmniBusAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data = action.payload.data;
      })
      .addCase(getAllOmniBusAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOmniBusAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOmniBusAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data.push(action.payload.data);
      })
      .addCase(createOmniBusAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOmniBusAccountById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOmniBusAccountById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.currentData = action.payload.data;
      })
      .addCase(getOmniBusAccountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOmniBusAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOmniBusAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        const updatedOmniBusAccount = action.payload.data;
        if (updatedOmniBusAccount.omniBusAccount_id) {
          state.data = state.data.map((item) =>
            item.omniBusAccount_id === updatedOmniBusAccount.omniBusAccount_id
              ? updatedOmniBusAccount
              : item
          );
        }
      })
      .addCase(updateOmniBusAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOmniBusAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOmniBusAccount.fulfilled, (state, action) => {
        state.loading = false;
        const { omniBusAccount_id } = action.payload;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        if (omniBusAccount_id) {
          state.data = state.data.filter(
            (item) => item.omniBusAccount_id !== omniBusAccount_id
          );
        }
      })
      .addCase(deleteOmniBusAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentData } = omniBusAccountSlice.actions;
export default omniBusAccountSlice.reducer;
