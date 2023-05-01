import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PortfolioSecurityService from "../../services/PortfolioSecurityServices";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getAllPortfolioSecurity = createAsyncThunk(
  "portfolioSecurity/getAll",
  async () => {
    const res = await PortfolioSecurityService.getAllPortfolioSecurity();
    return res.data;
  }
);

export const createPortfolioSecurity = createAsyncThunk(
  "portfolioSecurity/create",
  async (data) => {
    const res = PortfolioSecurityService.createPortfolioSecurity(data);
    return res.data;
  }
);

export const getPortfolioSecurityById = createAsyncThunk(
  "portfolioSecurity/get",
  async (id) => {
    const res = await PortfolioSecurityService.getPortfolioSecurityById(id);
    return res.data;
  }
);

export const updatePortfolioSecurity = createAsyncThunk(
  "portfolioSecurity/update",
  async ({ id, data }) => {
    const res = await PortfolioSecurityService.updatePortfolioSecurity(
      id,
      data
    );
    return res.data;
  }
);

export const deletePortfolioSecurity = createAsyncThunk(
  "portfolioSecurity/delete",
  async (id) => {
    const res = await PortfolioSecurityService.deletePortfolioSecurity(id);
    return res.data;
  }
);

const portfolioSecuritySlice = createSlice({
  name: "portfolioSecurity",
  initialState,
  extraReducers: {
    [getAllPortfolioSecurity.pending]: (state) => {
      state.loading = true;
    },
    [getAllPortfolioSecurity.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAllPortfolioSecurity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createPortfolioSecurity.pending]: (state) => {
      state.loading = true;
    },
    [createPortfolioSecurity.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [createPortfolioSecurity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getPortfolioSecurityById.pending]: (state) => {
      state.loading = true;
    },
    [getPortfolioSecurityById.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getPortfolioSecurityById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updatePortfolioSecurity.pending]: (state) => {
      state.loading = true;
    },
    [updatePortfolioSecurity.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [updatePortfolioSecurity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deletePortfolioSecurity.pending]: (state) => {
      state.loading = true;
    },
    [deletePortfolioSecurity.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [deletePortfolioSecurity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default portfolioSecuritySlice.reducer;
