import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CountryService from "services/CountryServices";

const initialState = {
  data: [],
  status: "",
  message: "",
  loading: false,
  currentData: null,
  error: null,
};

export const getAllCountries = createAsyncThunk("country/getAll", async () => {
  try {
    const response = await CountryService.getAllCountries();
    return response.data;
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
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const getCountryById = createAsyncThunk("country/get", async (id) => {
  try {
    const response = await CountryService.getCountryById(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const updateCountry = createAsyncThunk(
  "country/update",
  async (data) => {
    try {
      const response = await CountryService.updateCountry(data);
      return response.data;
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
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCurrentData: (state) => {
      state.currentData = initialState.currentData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data = action.payload.data;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.data.push(action.payload.data);
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
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        state.currentData = action.payload.data;
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
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        const updatedCountry = action.payload.data;
        if (updatedCountry.country_id) {
          state.data = state.data.map((item) =>
            item.country_id === updatedCountry.country_id
              ? updatedCountry
              : item
          );
        }
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
        const { country_id } = action.payload;
        state.status = action.payload.status.status;
        state.message = action.payload.status.message;
        if (country_id) {
          state.data = state.data.filter(
            (item) => item.country_id !== country_id
          );
        }
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentData } = countrySlice.actions;
export default countrySlice.reducer;
