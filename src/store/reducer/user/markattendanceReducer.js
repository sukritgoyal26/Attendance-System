import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const markAttendanceSlice = createSlice({
  name: "markAttendance",
  initialState,
  reducers: {
    markAttendanceStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    markAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    markAttendanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = markAttendanceSlice;

export const markAttendance = (action) => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  console.log(token);
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.markAttendanceStart());

  try {
    const response = await axios.post(
      `/api/user/markattendance/`,
      action,
      config
    );
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.markAttendanceSuccess(responseData));
    console.log(responseData);

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.markAttendanceFailure(error.message));
  }
};

export default markAttendanceSlice.reducer;
