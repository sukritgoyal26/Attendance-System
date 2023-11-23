// singleAttendanceDetailReducer.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  attendanceDetails: null,
};

const singleAttendanceDetailSlice = createSlice({
  name: "singleAttendanceDetail",
  initialState,
  reducers: {
    fetchAttendanceDetailStart: (state) => {
      state.loading = true;
      state.error = null;
      state.attendanceDetails = null;
    },
    fetchAttendanceDetailSuccess: (state, action) => {
      state.loading = false;
      state.attendanceDetails = action.payload;
    },
    fetchAttendanceDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = singleAttendanceDetailSlice;

export const fetchAttendanceDetail = () => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  console.log(token);
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.fetchAttendanceDetailStart());

  try {
    const response = await axios.get(
      `/api/user/singleattendancedetail`,
      config
    );
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.fetchAttendanceDetailSuccess(responseData));
    console.log(responseData);

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.fetchAttendanceDetailFailure(error.message));
  }
};

export default singleAttendanceDetailSlice.reducer;
