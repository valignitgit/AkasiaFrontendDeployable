import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SecurityService from "services/SecurityServices";

const initialState = {
  data: [],
  loading: false,
  currentData: null,
  error: null,
};

export const getAllSecurities = createAsyncThunk(
  "security/getAll",
  async () => {
    try {
      const response = await SecurityService.getAllSecurities();
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const createSecurity = createAsyncThunk(
  "security/create",
  async (data) => {
    try {
      const response = await SecurityService.createSecurity(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const getSecurityById = createAsyncThunk("security/get", async (id) => {
  try {
    const response = await SecurityService.getSecurityById(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const updateSecurity = createAsyncThunk(
  "security/update",
  async ({ id, data }) => {
    try {
      const response = await SecurityService.updateSecurity(id, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

export const deleteSecurity = createAsyncThunk(
  "security/delete",
  async (id) => {
    try {
      const response = await SecurityService.deleteSecurity(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
);

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    setCurrentData: (state) => {
      state.currentData = initialState.currentData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSecurities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSecurities.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllSecurities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSecurity.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSecurity.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createSecurity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSecurityById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSecurityById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentData = action.payload;
      })
      .addCase(getSecurityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSecurity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSecurity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSecurity = action.payload;
        if (updatedSecurity.security_id) {
          state.data = state.data.map((item) =>
            item.security_id === updatedSecurity.security_id
              ? updatedSecurity
              : item
          );
        }
      })
      .addCase(updateSecurity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSecurity.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSecurity.fulfilled, (state, action) => {
        state.loading = false;
        const { security_id } = action.payload;
        if (security_id) {
          state.data = state.data.filter(
            (item) => item.security_id !== security_id
          );
        }
      })
      .addCase(deleteSecurity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentData } = securitySlice.actions;
export default securitySlice.reducer;
