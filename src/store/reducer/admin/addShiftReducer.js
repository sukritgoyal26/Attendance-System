// shiftSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  shifts: [],
  loading: false,
  error: null,
};

const shiftSlice = createSlice({
  name: "shift",
  initialState,
  reducers: {
    addShiftStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addShiftSuccess: (state, action) => {
      state.loading = false;
      state.shifts.push(action.payload);
    },
    addShiftFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = shiftSlice;

export const addShift = (shiftData) => async (dispatch) => {
  dispatch(actions.addShiftStart());

  try {
    const response = await axios.post(`/api/admin/addshift`, shiftData);
    dispatch(actions.addShiftSuccess(response.data));
    console.log(response);
  } catch (error) {
    dispatch(actions.addShiftFailure(error.message));
  }
};

export default shiftSlice.reducer;
