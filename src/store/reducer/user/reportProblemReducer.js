import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const reportProblemSlice = createSlice({
  name: "reportProblem",
  initialState,
  reducers: {
    reportProblemStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    reportProblemSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    reportProblemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = reportProblemSlice;

export const createReportProblem = (data) => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.reportProblemStart());

  try {
    const response = await axios.post(`/api/user/reportproblem`, data, config);
    // Access the data property of the response object
    const responseData = response.data;
    console.log(responseData);
    dispatch(actions.reportProblemSuccess(responseData));

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.reportProblemFailure(error.message));
  }
};

export default reportProblemSlice.reducer;
