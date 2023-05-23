import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CountryService from "../../services/CountryServices";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getAllCountry = createAsyncThunk("country/getAll", async () => {
  try {
    const response = await CountryService.getAllCountry();
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const createCountry = createAsyncThunk(
  "country/create",
  async (data) => {
    try {
      const response = await CountryService.createCountry(data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const getCountryById = createAsyncThunk(
  "country/getCountryById",
  async (id) => {
    try {
      const response = await CountryService.getCountryById(id);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const updateCountry = createAsyncThunk(
  "country/update",
  async ({ id, data }) => {
    try {
      const response = await CountryService.updateCountry(id, data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const deleteCountry = createAsyncThunk("country/delete", async (id) => {
  try {
    const response = await CountryService.deleteCountry(id);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const resetCountryState = createAsyncThunk("country/reset", async () => {
  return [];
});

const countryReducer = createSlice({
  name: "country",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getAllCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCountryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCountryById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCountryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetCountryState.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetCountryState.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(resetCountryState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default countryReducer.reducer;
