import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  isAdmin: false,
  loading: false,
  error: null,
};

const adminRegisterSlice = createSlice({
  name: "adminRegister",
  initialState,
  reducers: {
    adminRegisterStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    adminRegisterSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },
    adminRegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = adminRegisterSlice;

export const adminRegister = (formData) => async (dispatch) => {
  dispatch(actions.adminRegisterStart());

  try {
    const response = await axios.post(`/api/admin/adminregister`, formData);
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.adminRegisterSuccess(responseData));
    console.log(responseData);

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.adminRegisterFailure(error.message));
  }
};

export default adminRegisterSlice.reducer;
