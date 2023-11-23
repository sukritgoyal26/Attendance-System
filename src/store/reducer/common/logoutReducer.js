import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  teamLead: false,
  loading: false,
  error: null,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logoutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.token = null;
      state.teamLead = false;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = logoutSlice;

export const userLogout = () => async (dispatch) => {
  dispatch(actions.logoutStart());

  try {
    // Perform client-side operations to clear authentication-related data
    localStorage.removeItem("token");
    localStorage.removeItem("teamLead");
    localStorage.removeItem("admin");

    dispatch(actions.logoutSuccess());
  } catch (error) {
    dispatch(actions.logoutFailure(error.message));
  }
};

export default logoutSlice.reducer;
