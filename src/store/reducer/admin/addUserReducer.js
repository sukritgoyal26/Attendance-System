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
    addUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    addUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = userSlice;

export const addUser = (formData) => async (dispatch) => {
  dispatch(actions.addUserStart());

  try {
    const response = await axios.post(`/api/admin/adduser`, formData);
    dispatch(actions.addUserSuccess(response.data));
    console.log(response);
  } catch (error) {
    dispatch(actions.addUserFailure(error.message));
  }
};

export default userSlice.reducer;
