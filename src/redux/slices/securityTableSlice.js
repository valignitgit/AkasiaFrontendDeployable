import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
  addFormData: {
    security_id: "",
    weightage_pct: "",
  },
  editFormData: {
    security_id: "",
    weightage_pct: "",
  },
  editRowId: null,
};

const securityTableSlice = createSlice({
  name: "securityTable",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setAddFormData: (state, action) => {
      state.addFormData = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setEditRowId: (state, action) => {
      state.editRowId = action.payload;
    },
  },
});

export const { setData, setAddFormData, setEditFormData, setEditRowId } =
  securityTableSlice.actions;

export default securityTableSlice.reducer;
