import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  feedbacks: [],
  loading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    fetchFeedbacksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFeedbacksSuccess: (state, action) => {
      state.loading = false;
      state.feedbacks = action.payload;
    },
    fetchFeedbacksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = feedbackSlice;

export const fetchFeedbacks = (userEmail) => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  dispatch(actions.fetchFeedbacksStart());
  try {
    const response = await axios.post(
      `/api/common/fetchfeedback`,
      { userEmail },
      config
    );
    dispatch(actions.fetchFeedbacksSuccess(response.data.feedbacks));
    console.log(response);
    return response;
  } catch (error) {
    dispatch(actions.fetchFeedbacksFailure(error.message));
  }
};

export default feedbackSlice.reducer;
