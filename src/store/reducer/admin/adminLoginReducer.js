import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  isAdmin: false,
  loading: false,
  error: null,
};

const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    adminLoginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    adminLoginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },
    adminLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = adminLoginSlice;

export const adminLogin = (formData) => async (dispatch) => {
  dispatch(actions.adminLoginStart());

  try {
    const response = await axios.post(`/api/admin/adminlogin`, formData);
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.adminLoginSuccess(responseData));
    console.log(responseData);

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.adminLoginFailure(error.message));
  }
};

export default adminLoginSlice.reducer;
