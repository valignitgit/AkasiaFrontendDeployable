import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthServices from "services/AuthServices";

const initialState = {
  data: [],
  loading: false,
  error: null,
  loginData: {
    user_id: "",
    password: "",
  },
};

export const login = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await AuthServices.login(data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = AuthServices.logout();
  return res.data;
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ email, data }) => {
    try {
      const response = await AuthServices.changePassword(email, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      throw error;
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoginData: (state, action) => {
      state.loginData = { ...state.loginData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setData, setLoginData } = authReducer.actions;
export default authReducer.reducer;
