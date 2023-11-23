"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createLeaveRequest } from "@/store/reducer/user/markLeaveReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveRequestForm = () => {
  const [leaveDuration, setLeaveDuration] = useState(0);
  const [fromDate, setFromDate] = useState(0);
  const [toDate, setToDate] = useState(0);
  // Function to show  message as a toast
  const showLeaveStatusToast = (message) => {
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
    // Calculate the difference between from_date and to_date
    const fromDate = new Date(data.from_date);
    const formattedFromDate = fromDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    setFromDate(formattedFromDate);
    const toDate = new Date(data.to_date);
    const formattedToDate = toDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    setToDate(formattedToDate);
    const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Set the calculated leave duration
    setLeaveDuration(diffDays);

    // Dispatch the addBlog action with the form data and headers
    dispatch(createLeaveRequest(data)).then((response) => {
      if (response) {
        showLeaveStatusToast("Leave Submitted Successfully");
      } else {
        showLeaveStatusToast("Some error occur , Please Try again later");
      }
    });
  };
  return (
    <div>
      <div className="md:flex md:justify-between md:items-center my-5 ">
        <form
          className="mx-2 md:w-3/4 w-full "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-textColor "
            >
              Leave Type
            </label>

            <select
              id="leaveType"
              className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              {...register("leaveType")}
            >
              <option selected>Choose Leave Type</option>
              <option value="annual">Annual Leave</option>
              <option value="monthly">Monthly Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="md:flex mb-4">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="from_date"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                From
              </label>
              <input
                type="date"
                id="from_date"
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                {...register("from_date")}
              />
            </div>
            <div className="w-full md:w-1/2 md:mx-2">
              <label
                htmlFor="to_date"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                To
              </label>
              <input
                type="date"
                id="to_date"
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                {...register("to_date")}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              for="reason"
              className="block mb-2 text-sm font-medium text-textColor "
            >
              Reason
            </label>
            <textarea
              rows={4}
              id="reason"
              className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              {...register("reason")}
            />
          </div>

          <div className="lg:absolute lg:bottom-2 lg:right-2 flex justify-end" style={{backgroundColor:"black"}}>
            <button className="mx-1 text-white text-sm text-center bg-textColor p-2 rounded-lg" style={{backgroundColor:"black"}}>
              Cancel
            </button>
            <button
              className="mx-1  text-white text-sm text-center bg-themeColor p-2 rounded-lg"
              type="submit"
            >
              Request Now
            </button>
          </div>
        </form>
        <ToastContainer />
        {leaveDuration > 0 && (
          <div className="my-2 mx-2 md:w-1/4 w-full border border-gray-300 rounded-lg bg-indigo-50 p-3">
            <div className="text-sm font-normal mb-5">
              Your Request Includes
            </div>
            <div className="flex justify-between mb-1">
              <div className="text-xs font-medium ">
                {" "}
                {leaveDuration > 0 ? `${fromDate} ` : ""}
              </div>
              <div className="text-sm font-medium text-themeColor flex items-center">
                Edit <FiEdit className="mx-1" />{" "}
              </div>
            </div>
            <div className="flex justify-between mb-5">
              <div className="text-xs font-medium ">
                {" "}
                {leaveDuration > 0 ? `${toDate}` : ""}
              </div>
              <div className="text-sm font-medium text-themeColor flex items-center">
                Edit <FiEdit className="mx-1" />{" "}
              </div>
            </div>
            <hr />
            <div className="text-sm font-normal my-2">
              {" "}
              {leaveDuration > 0 ? `${leaveDuration} Days of leave` : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestForm;
