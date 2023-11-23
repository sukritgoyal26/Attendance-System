import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  alerts: [],
  loading: false,
  error: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlertStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addAlertSuccess: (state, action) => {
      state.loading = false;
      state.alerts.push(action.payload);
    },
    addAlertFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = alertSlice;

export const addAlert = (formData) => async (dispatch) => {
  dispatch(actions.addAlertStart());

  try {
    const response = await axios.post(`/api/admin/addalert`, formData);
    dispatch(actions.addAlertSuccess(response.data));
    console.log(response);
  } catch (error) {
    dispatch(actions.addAlertFailure(error.message));
  }
};

export default alertSlice.reducer;
