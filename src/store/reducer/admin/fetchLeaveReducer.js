// leaveSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  leaves: [],
  loading: false,
  error: null,
};

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    fetchLeavesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLeavesSuccess: (state, action) => {
      state.loading = false;
      state.leaves = action.payload;
    },
    fetchLeavesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = leaveSlice;

export const fetchLeaves = () => async (dispatch) => {
  dispatch(actions.fetchLeavesStart());

  try {
    const response = await axios.get(`/api/admin/fetchleaves`);
    dispatch(actions.fetchLeavesSuccess(response.data.leaves));
    return response;
  } catch (error) {
    dispatch(actions.fetchLeavesFailure(error.message));
  }
};

export default leaveSlice.reducer;
