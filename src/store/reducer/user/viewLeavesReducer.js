import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  userLeaves: [], // This will hold the user's leave records
};

const viewLeavesSlice = createSlice({
  name: "viewLeaves",
  initialState,
  reducers: {
    viewLeavesStart: (state) => {
      state.loading = true;
      state.error = null;
      state.userLeaves = [];
    },
    viewLeavesSuccess: (state, action) => {
      state.loading = false;
      state.userLeaves = action.payload;
    },
    viewLeavesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = viewLeavesSlice;

export const fetchUserLeaves = () => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.viewLeavesStart());

  try {
    const response = await axios.get(`/api/user/viewleaves`, config);
    // Access the data property of the response object
    const userLeaves = response.data.userLeaves;
    dispatch(actions.viewLeavesSuccess(userLeaves));

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.viewLeavesFailure(error.message));
  }
};

export default viewLeavesSlice.reducer;
