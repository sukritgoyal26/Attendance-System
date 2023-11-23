import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  reports: [],
};

const fetchReportsSlice = createSlice({
  name: "fetchReports",
  initialState,
  reducers: {
    fetchReportsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReportsSuccess: (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    },
    fetchReportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = fetchReportsSlice;

export const fetchReports = () => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.fetchReportsStart());

  try {
    const response = await axios.get(`/api/user/fetchreports`, config);
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.fetchReportsSuccess(responseData));

    // Return the response object to be used in the .then block

    return response;
  } catch (error) {
    dispatch(actions.fetchReportsFailure(error.message));
  }
};

export default fetchReportsSlice.reducer;
