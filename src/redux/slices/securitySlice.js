import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SecurityService from "../../services/SecurityServices";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getAllSecurity = createAsyncThunk("security/getAll", async () => {
  const res = await SecurityService.getAllSecurity();
  return res.data;
});

export const createSecurity = createAsyncThunk(
  "security/create",
  async (data) => {
    const res = SecurityService.createSecurity(data);
    return res.data;
  }
);

export const getSecurityById = createAsyncThunk("security/get", async (id) => {
  const res = await SecurityService.getSecurityById(id);
  return res.data;
});

export const updateSecurity = createAsyncThunk(
  "security/update",
  async ({ id, data }) => {
    const res = await SecurityService.updateSecurity(id, data);
    return res.data;
  }
);

const securitySlice = createSlice({
  name: "security",
  initialState,
  extraReducers: {
    [getAllSecurity.pending]: (state) => {
      state.loading = true;
    },
    [getAllSecurity.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAllSecurity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createSecurity.pending]: (state) => {
      state.loading = true;
    },
    [createSecurity.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [createSecurity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getSecurityById.pending]: (state) => {
      state.loading = true;
    },
    [getSecurityById.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getSecurityById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateSecurity.pending]: (state) => {
      state.loading = true;
    },
    [updateSecurity.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [updateSecurity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default securitySlice.reducer;
