import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await AuthServices.login(data);
  return res.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = AuthServices.logout();
  return res.data;
});

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { setData } = authReducer.actions;
export default authReducer.reducer;
