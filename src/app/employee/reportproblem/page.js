"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import EmployeeLayout from "@/app/components/layouts/employeelayout/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiAlertCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createReportProblem } from "@/store/reducer/user/reportProblemReducer"; // Import the action
import { useForm } from "react-hook-form";
import ProblemLists from "@/app/components/common/issues/page";
import { fetchReports } from "@/store/reducer/user/fetchReportReducer";

const ReportProblem = () => {
  const { register, handleSubmit } = useForm();
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to show a toast message
  const showToast = (message) => {
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
  //  to fetch reports
  useEffect(() => {
    // Dispatch the action to fetch reports
    dispatch(fetchReports())
      .then((response) => {
        // Assuming response.data is an array of reports
        setReports(response.data.reports);
       
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  }, [dispatch]);

 

  // submit new problem

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(createReportProblem(data));
      if (response) {
        showToast("Problem Reported Successfully");
        closeModal();
      } else {
        showToast("Failed to report problem. Please try again later.");
      }
    } catch (error) {
      console.error("Error reporting problem:", error);
      showToast("An error occurred while reporting the problem.");
    }
  };

  // Custom header for the modal
  const ModalHeader = () => (
    <div
      className="p-2 border-b border-gray-300"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <BreadCrumb text="Report A Problem" />
      <button
        onClick={closeModal}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        x
      </button>
    </div>
  );

  return (
    <EmployeeLayout>
      <div>
        <div className="bg-card p-2 m-2 rounded-lg mb-5">
          <div className="flex justify-between items-center my-2 ">
            <BreadCrumb text="Issues" />
            <button
              className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
              style={{backgroundColor:"black"}}
              onClick={openModal}
            >
              <FiAlertCircle className="text-white mx-2" /> Report A Problem
            </button>
          </div>
        </div>
        {/* Moved ProblemLists component here */}
        {reports.length > 0 ? (
          <ProblemLists reports={reports} />
        ) : (
          <p className="mx-2 text-xs">Loading...</p>
        )}
      </div>

      {/* The Modal component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Report A Problem Modal"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={true}
        style={{
          content: {
            margin: "auto",
            borderRadius: "8px",
            zIndex: 10,
          },
          overlay: {
            zIndex: 9,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <ModalHeader />
        <form className="mx-2 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label
              htmlFor="reason"
              className="block mb-2 text-sm font-medium text-textColor"
            >
              Describe the Problem:
            </label>
            <textarea
              rows={7}
              id="reason"
              className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5"
              name="message"
              required
              {...register("message")}
            />
          </div>
          <div className="lg:absolute lg:bottom-2 lg:right-2 flex justify-end">
            <button className="mx-1 text-white text-sm text-center bg-textColor p-2 rounded-lg" style={{backgroundColor:"black"}}>
              Cancel
            </button>
            <button
              className="mx-1 text-white text-sm text-center bg-themeColor p-2 rounded-lg" style={{backgroundColor:"black"}}
              type="submit"
            >
              Request Now
            </button>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </EmployeeLayout>
  );
};

export default ReportProblem;
