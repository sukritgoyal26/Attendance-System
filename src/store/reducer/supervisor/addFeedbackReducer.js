import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  submitting: false,
  submitted: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    submitFeedbackStart: (state) => {
      state.submitting = true;
      state.submitted = false;
      state.error = null;
    },
    submitFeedbackSuccess: (state) => {
      state.submitting = false;
      state.submitted = true;
    },
    submitFeedbackFailure: (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = feedbackSlice;

export const submitFeedback = (userEmail, feedbackText) => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  const requestBody = JSON.stringify({
    userEmail,
    feedbackText,
  });

  dispatch(actions.submitFeedbackStart());

  try {
    await axios.post(`/api/supervisor/submitfeedback`, requestBody, config);
    dispatch(actions.submitFeedbackSuccess());
  } catch (error) {
    dispatch(actions.submitFeedbackFailure(error.message));
  }
};

export default feedbackSlice.reducer;
