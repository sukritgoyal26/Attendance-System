import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  reports: [],
};

const fetchProblemSlice = createSlice({
  name: "fetchProblem",
  initialState,
  reducers: {
    fetchProblemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProblemSuccess: (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    },
    fetchProblemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = fetchProblemSlice;

export const fetchProblem = () => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.fetchProblemStart());

  try {
    const response = await axios.get(`/api/admin/fetchproblems`);
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.fetchProblemSuccess(responseData));

    // Return the response object to be used in the .then block

    return response;
  } catch (error) {
    dispatch(actions.fetchProblemFailure(error.message));
  }
};

export default fetchProblemSlice.reducer;
