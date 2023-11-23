// teamLeadSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teamLeads: [],
  loading: false,
  error: null,
};

const teamLeadSlice = createSlice({
  name: "teamLead",
  initialState,
  reducers: {
    fetchTeamLeadsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTeamLeadsSuccess: (state, action) => {
      state.loading = false;
      state.teamLeads = action.payload;
    },
    fetchTeamLeadsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = teamLeadSlice;

export const fetchTeamLeads = () => async (dispatch) => {
  dispatch(actions.fetchTeamLeadsStart());

  try {
    const response = await axios.get(`/api/admin/fetchteamleads`);
    dispatch(actions.fetchTeamLeadsSuccess(response.data.allTeamLeads));
    return response;
  } catch (error) {
    dispatch(actions.fetchTeamLeadsFailure(error.message));
  }
};

export default teamLeadSlice.reducer;
