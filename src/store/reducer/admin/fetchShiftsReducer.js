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
    fetchShiftsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchShiftsSuccess: (state, action) => {
      state.loading = false;
      state.shifts = action.payload;
    },
    fetchShiftsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = shiftSlice;

export const fetchShifts = () => async (dispatch) => {
  dispatch(actions.fetchShiftsStart());

  try {
    const response = await axios.get(`/api/admin/fetchshifts`);
    dispatch(actions.fetchShiftsSuccess(response.data.allShifts));
    return response;
  } catch (error) {
    dispatch(actions.fetchShiftsFailure(error.message));
  }
};

export default shiftSlice.reducer;
