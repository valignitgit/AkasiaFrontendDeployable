import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleMobileOpen: (state) => {
      state.mobileOpen = !state.mobileOpen;
    },
  },
});

export const { toggleMobileOpen } = layoutSlice.actions;
export default layoutSlice.reducer;
