// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = userSlice;

export const fetchUsers = () => async (dispatch) => {
  dispatch(actions.fetchUsersStart());

  try {
    const response = await axios.get(`/api/admin/fetchusers`);
    dispatch(actions.fetchUsersSuccess(response.data.users));
    return response;
  } catch (error) {
    dispatch(actions.fetchUsersFailure(error.message));
  }
};

export default userSlice.reducer;
