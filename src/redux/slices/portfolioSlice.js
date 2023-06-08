import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PortfolioService from "services/PortfolioServices";

const initialState = {
  data: [],
  loading: false,
  currentData: null,
  error: null,
};

export const getAllPortfolios = createAsyncThunk(
  "portfolio/getAll",
  async () => {
    try {
      const response = await PortfolioService.getAllPortfolios();
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const createPortfolio = createAsyncThunk(
  "portfolio/create",
  async (data) => {
    try {
      const response = await PortfolioService.createPortfolio(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const getPortfolioById = createAsyncThunk(
  "portfolio/get",
  async (id) => {
    try {
      const response = await PortfolioService.getPortfolioById(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const updatePortfolio = createAsyncThunk(
  "portfolio/update",
  async ({ id, data }) => {
    try {
      const response = await PortfolioService.updatePortfolio(id, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const deletePortfolio = createAsyncThunk(
  "portfolio/delete",
  async (id) => {
    try {
      const response = await PortfolioService.deletePortfolio(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setCurrentData: (state) => {
      state.currentData = initialState.currentData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPortfolios.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPortfolios.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllPortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPortfolio.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPortfolioById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPortfolioById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentData = action.payload;
      })
      .addCase(getPortfolioById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePortfolio.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPortfolio = action.payload;
        if (updatedPortfolio.portfolio_id) {
          state.data = state.data.map((item) =>
            item.portfolio_id === updatedPortfolio.portfolio_id
              ? updatedPortfolio
              : item
          );
        }
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePortfolio.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        const { portfolio_id } = action.payload;
        if (portfolio_id) {
          state.data = state.data.filter(
            (item) => item.portfolio_id !== portfolio_id
          );
        }
      })
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentData } = portfolioSlice.actions;
export default portfolioSlice.reducer;
