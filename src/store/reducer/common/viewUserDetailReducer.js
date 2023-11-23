import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  userDetails: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    userDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
      state.userDetails = null;
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false;
      state.userDetails = action.payload;
    },
    userDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = userDetailsSlice;

export const fetchUserDetails = (email) => async (dispatch) => {
  //   const token = localStorage.getItem("token"); // Get the token from localStorage
  //   const config = {
  //     headers: {
  //       Authorization: token,
  //     },
  //   };

  dispatch(actions.userDetailsStart());

  try {
    const response = await axios.post(`/api/common/userdetail`, { email });
    // Access the data property of the response object
    const userDetails = response.data;
    dispatch(actions.userDetailsSuccess(userDetails));
    console.log(userDetails);

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.userDetailsFailure(error.message));
  }
};

export default userDetailsSlice.reducer;
