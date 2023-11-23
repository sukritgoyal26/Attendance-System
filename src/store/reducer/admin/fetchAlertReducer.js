// alertSlice.js
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
    // ...existing reducer actions

    fetchAlertsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAlertsSuccess: (state, action) => {
      state.loading = false;
      state.alerts = action.payload;
    },
    fetchAlertsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = alertSlice;

export const fetchAlerts = () => async (dispatch) => {
  dispatch(actions.fetchAlertsStart());

  try {
    const response = await axios.get(`/api/admin/fetchalerts`);
    dispatch(actions.fetchAlertsSuccess(response.data.alerts));
    return response;
  } catch (error) {
    dispatch(actions.fetchAlertsFailure(error.message));
  }
};

export default alertSlice.reducer;
