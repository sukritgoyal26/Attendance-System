"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiStar } from "react-icons/fi";
import { submitFeedback } from "@/store/reducer/supervisor/addFeedbackReducer";

const FeedbackForm = ({ email }) => {
  // Function to show  message as a toast
  const showfeedBackToast = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // Dispatch the addReview action with the form data and headers
    console.log(data);
    dispatch(submitFeedback(email, data.feedbackText)).then((response) => {
      if (response) {
        showfeedBackToast("Review Submitted Successfully");
      } else {
        showfeedBackToast("Some error occurred, Please Try again later");
      }
    });
  };
  return (
  );
};

export default FeedbackForm;
