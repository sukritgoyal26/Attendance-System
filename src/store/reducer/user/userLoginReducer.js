import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  teamLead: false,
  loading: false,
  error: null,
};

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    userLoginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.teamLead = action.payload.teamLead;
    },
    userLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = userLoginSlice;

export const userLogin = (formData) => async (dispatch) => {
  dispatch(actions.userLoginStart());

  try {
    const response = await axios.post(`/api/user/userlogin`, formData);
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.userLoginSuccess(responseData));
    console.log(responseData);

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.userLoginFailure(error.message));
  }
};

export default userLoginSlice.reducer;
