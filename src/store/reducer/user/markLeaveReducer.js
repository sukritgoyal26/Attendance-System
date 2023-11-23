import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const leaveRequestSlice = createSlice({
  name: "leaveRequest",
  initialState,
  reducers: {
    leaveRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    leaveRequestSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    leaveRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = leaveRequestSlice;

export const createLeaveRequest = (data) => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.leaveRequestStart());

  try {
    const response = await axios.post(`/api/user/markleave`, data, config);
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.leaveRequestSuccess(responseData));

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.leaveRequestFailure(error.message));
  }
};

export default leaveRequestSlice.reducer;
