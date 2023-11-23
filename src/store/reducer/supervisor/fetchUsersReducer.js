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
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch(actions.fetchUsersStart());

  try {
    const response = await axios.get(`/api/supervisor/fetchusers`, config);
    dispatch(actions.fetchUsersSuccess(response.data.users));
    return response;
  } catch (error) {
    dispatch(actions.fetchUsersFailure(error.message));
  }
};

export default userSlice.reducer;
