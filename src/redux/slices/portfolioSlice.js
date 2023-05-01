import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PortfolioService from "../../services/PortfolioServices";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getAllPortfolio = createAsyncThunk(
  "portfolio/getAll",
  async () => {
    const res = await PortfolioService.getAllPortfolio();
    return res.data;
  }
);

export const createPortfolio = createAsyncThunk(
  "portfolio/create",
  async (data) => {
    const res = PortfolioService.createPortfolio(data);
    return res.data;
  }
);

export const getPortfolioById = createAsyncThunk(
  "portfolio/get",
  async (id) => {
    const res = await PortfolioService.getPortfolioById(id);
    return res.data;
  }
);

export const updatePortfolio = createAsyncThunk(
  "portfolio/update",
  async ({ id, data }) => {
    const res = await PortfolioService.updatePortfolio(id, data);
    return res.data;
  }
);

export const deletePortfolio = createAsyncThunk(
  "portfolio/delete",
  async (id) => {
    const res = await PortfolioService.deletePortfolio(id);
    return res.data;
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  extraReducers: {
    [getAllPortfolio.pending]: (state) => {
      state.loading = true;
    },
    [getAllPortfolio.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAllPortfolio.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createPortfolio.pending]: (state) => {
      state.loading = true;
    },
    [createPortfolio.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [createPortfolio.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getPortfolioById.pending]: (state) => {
      state.loading = true;
    },
    [getPortfolioById.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getPortfolioById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updatePortfolio.pending]: (state) => {
      state.loading = true;
    },
    [updatePortfolio.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [updatePortfolio.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deletePortfolio.pending]: (state) => {
      state.loading = true;
    },
    [deletePortfolio.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [deletePortfolio.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default portfolioSlice.reducer;
