"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import UserDetailCard from "@/app/components/userdetailcard/page";
import { usePathname } from "next/navigation";
import { FaBars, FaDownload, FaSignInAlt, FaSort } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import {
  FiFilter,
  FiGrid,
  FiLogIn,
  FiLogOut,
  FiShield,
  FiStar,
  FiUserCheck,
} from "react-icons/fi";
import { fetchUserDetails } from "@/store/reducer/common/viewUserDetailReducer";
import SupervisorLayout from "@/app/components/layouts/supervisorlayout/page";
import FeedbackForm from "@/app/components/common/supervisor/feedbackform";
import { fetchFeedbacks } from "@/store/reducer/common/fetchFeedbackReducer";

export default function Page() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [isModalOpenFeedback, setIsModalOpenFeedback] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const parts = pathname.split("/");
  const email = parts[parts.length - 1];

  // to get the user details
  useEffect(() => {
    dispatch(fetchUserDetails(email));
    dispatch(fetchFeedbacks(email))
      .then((response) => {
        // Assuming response.data is an array of feedbacks
        setFeedbacks(response.data.feedbacks);
      })
      .catch((error) => {
        console.error("Error fetching alerts:", error);
      });
  }, [email]);

  // Use useSelector to access Redux state
  const userDetails = useSelector((state) => state.viewUserDetail.userDetails);
  const loading = useSelector((state) => state.viewUserDetail.loading);
  const error = useSelector((state) => state.viewUserDetail.error);

  if (userDetails) {
    "details", userDetails;
  }

  // array of objects for attendance history

  const userDetailCards = [
    {
      textColor: "text-greenColor",
      background: "bg-green-100",
      status: "On Time",
    },
    {
      textColor: "text-yellowColor",
      background: "bg-yellow-100",
      status: "Late",
    },
    {
      textColor: "text-redColor",
      background: "bg-red-100",
      status: "Absent",
    },
    {
      textColor: "text-textColor",
      background: "bg-gray-100",
      status: "On Leave",
    },
    {
      textColor: "text-greenColor",
      background: "bg-green-100",
      status: "On Time",
    },
    {
      textColor: "text-greenColor",
      background: "bg-green-100",
      status: "On Time",
    },
    {
      textColor: "text-textColor",
      background: "bg-gray-100",
      status: "On Leave",
    },
    {
      textColor: "text-redColor",
      background: "bg-red-100",
      status: "Absent",
    },
    {
      textColor: "text-greenColor",
      background: "bg-green-100",
      status: "On Time",
    },
    {
      textColor: "text-greenColor",
      background: "bg-green-100",
      status: "On Time",
    },
    // Add more cards here if needed
    // ...
  ];

  //  grid mode
  const [isGridMode, setIsGridMode] = useState(true);

  // Event handler for toggling layout mode
  const toggleLayoutMode = () => {
    setIsGridMode((prevMode) => !prevMode);
  };
  // pagination

  const CardsPerPage = 9; // Number of cards to display per page
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderCards = () => {
    if (!userDetails) {
      return <p>Loading...</p>;
    }
    const startIndex = currentPage * CardsPerPage;
    const endIndex = startIndex + CardsPerPage;

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return userDetails?.attendanceHistory
      ?.slice(startIndex, endIndex)
      .map((card, index) => {
        const checkInDate = new Date(card.checkIn);
        const checkOutDate = new Date(card.checkOut);

        const checkInTime = isNaN(checkInDate)
          ? "Invalid Date"
          : checkInDate.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

        const checkOutTime = isNaN(checkOutDate)
          ? "Invalid Date"
          : checkOutDate.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

        const formattedCheckInDate = isNaN(checkInDate)
          ? "Invalid Date"
          : dateFormatter.format(checkInDate);

        const matchingCard = userDetailCards.find(
          (userCard) => userCard.status === card.status
        );

        const textColor = matchingCard
          ? matchingCard.textColor
          : "text-textColor";
        const background = matchingCard
          ? matchingCard.background
          : "bg-gray-100";

        return (
          <div key={index} className="mb-2">
            <UserDetailCard
              msg1="Check In Time"
              msg2="Check Out Time"
              check_in={checkInTime}
              check_out={checkOutTime}
              created_at="March 08 2023"
              textColor={textColor}
              background={background}
              status={card.status}
              current_date={formattedCheckInDate}
            />
          </div>
        );
      });
  };

  // Function to open the Feedback modal
  const openModalFeedbacks = () => {
    setIsModalOpenFeedback(true);
  };

  // Function to close the Feedback modal
  const closeModalFeedbacks = () => {
    setIsModalOpenFeedback(false);
  };

  // Custom header for the Feedback modal
  const ModalHeaderFeedback = () => (
    <div
      className="p-2 border-b border-gray-300"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <BreadCrumb text="Add Feedback" />

      <button
        onClick={closeModalFeedbacks}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        x
      </button>
    </div>
  );

  return (
    <div>
      <SupervisorLayout>
        <div className="mx-2">
          <div className="card rounded-lg shadow bg-card p-2 my-2">
            {/* card header start */}
            <div className="flex justify-between items-center my-2">
              <BreadCrumb text="Employee Details" />
              <div className="flex gap-2">
                <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg" style={{backgroundColor:"black"}}>
                  <FaDownload className="text-white mx-2" />{" "}
                  <span className="hidden md:block ">Download Info</span>
                </button>
                <button
                  className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
                  style={{backgroundColor:"black"}}
                  onClick={openModalFeedbacks}
                >
                  <FiStar className="text-white mx-2" />{" "}
                  <span className="hidden md:block "> Add review</span>
                </button>
              </div>
            </div>
            {/* card header ends  */}

            {/* basic info start  */}
            <div className="flex mb-2 items-center">
              <div>

              </div>
              <div className="mx-2">
                <div className="text-textColor text-xl md:text-2xl mb-2 px-6 py-3 flex items-center">
                  {userDetails
                    ? userDetails?.user?.firstName +
                      " " +
                      userDetails?.user?.lastName
                    : "..."}{" "}
                  {userDetails?.user?.teamLead && (
                    <div className="mx-2 rounded-full bg-themeColor p-2">
                      {" "}
                      <FiShield className="text-white" />
                    </div>
                  )}
                </div>

                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left ">
                    <thead className="text-xs  text-gray-500 uppercase bg-transparent">
                      <tr>
                        <td scope="col" className="px-6 py-3 ">
                          Role
                        </td>
                        <td scope="col" className="px-6 py-3">
                          Phone No
                        </td>
                        <td scope="col" className="px-6 py-3">
                          Email Address
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-transparent text-textColor">
                        <th className="px-6 py-4 font-md">Web Dev</th>
                        <th className="px-6 py-4 font-md"></th>
                        <th className="px-6 py-4 font-md">
                          {" "}
                          {userDetails ? userDetails?.user?.email : "..."}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* basic info end  */}
            {/* user detail card start */}
            <div className="mb-2 flex flex-wrap justify-between p-2">
              <div className="mb-2">
                <UserDetailCard
                  icon={<FaSignInAlt />}
                  attendanceTitle="Total Attendance"
                  attendanceCount={userDetails?.attendanceCount || "..."}
                />
              </div>
              <div className=" mb-2">
                <UserDetailCard
                  icon={<FiLogIn />}
                  attendanceTitle="Pending Leave Requests"
                  attendanceCount={userDetails?.totalPendingLeaves || "..."}
                />
              </div>
              <div className=" mb-2">
                <UserDetailCard
                  icon={<FiLogOut />}
                  attendanceTitle="Total Leaves"
                  attendanceCount={userDetails?.totalApprovedLeaves || "..."}
                />
              </div>
              <div className=" mb-2">
                <UserDetailCard
                  icon={<FiUserCheck />}
                  attendanceTitle="Total Absents"
                  attendanceCount={userDetails?.totalRejectedLeaves || "..."}
                />
              </div>
            </div>
            {/* user detail card end  */}
          </div>
          {/* attendance history start  */}
          <div className="card rounded-lg shadow bg-card p-2 my-2">
            <div className="flex justify-between items-center my-2">
              <BreadCrumb text="Attendance History" />
              <div className="flex items-center">
                <button
                  className={`mx-1 text-white text-sm text-center p-2 rounded-lg ${
                    isGridMode ? "bg-themeColor" : "bg-textColor"
                  }`}
                  onClick={toggleLayoutMode}
                >
                  <FiGrid className="text-white" />
                </button>
                <button
                  className={`mx-1 text-white text-sm text-center p-2 rounded-lg ${
                    isGridMode ? "bg-textColor" : "bg-themeColor"
                  }`}
                  onClick={toggleLayoutMode}
                >
                  <FaBars className="text-white" />
                </button>
                <button className="mx-1 flex items-center text-white text-sm text-center bg-textColor p-2 rounded-lg">
                  <FiFilter className="text-white mx-1" /> Filter
                </button>
                <button className="mx-1 flex items-center text-white text-sm text-center bg-textColor p-2 rounded-lg">
                  <FaSort className="text-white mx-1" /> Sort
                </button>
              </div>
            </div>
            <div
              className={`mb-2 ${
                isGridMode ? "flex flex-wrap justify-between p-2" : ""
              }`}
            >
              {renderCards()}
            </div>
          </div>
          {/* attendance history ends  */}

          {/* Pagination */}
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={
              userDetails && userDetails.attendanceHistory
                ? Math.ceil(userDetails.attendanceHistory.length / CardsPerPage)
                : Math.ceil(userDetailCards.length / CardsPerPage)
            }
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="pagination flex justify-center my-4"
            previousClassName="px-3 py-2 rounded-lg bg-gray-300 text-gray-700 cursor-pointer"
            nextClassName="px-3 py-2 rounded-lg bg-gray-300 text-gray-700 cursor-pointer"
            pageClassName="px-3 py-2 rounded-lg bg-gray-300 text-gray-700 cursor-pointer mx-1"
            breakClassName="px-3 py-2 rounded-lg bg-gray-300 text-gray-700 cursor-pointer mx-1"
            activeClassName="bg-themeColor text-white px-3 py-2 rounded-lg mx-1"
          />
          {/* Pagination end */}

          {/* feedback history start  */}
          {feedbacks.length > 0 && (
            <div className="card rounded-lg shadow bg-card p-2 my-4 ">
              <div className="flex justify-between items-center my-2">
                <BreadCrumb text="Reviews" />
              </div>
              {feedbacks.map((feedback, index) => (
                <div key={index}>
                  {" "}
                  <FeedbackCard feedback={feedback} />{" "}
                </div>
              ))}
            </div>
          )}
          {/* feedback history ends  */}
        </div>

        {/* The Feedback Modal component */}
        <Modal
          isOpen={isModalOpenFeedback}
          onRequestClose={closeModalFeedbacks}
          contentLabel="Feedback Modal"
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={true}
          // Style the modal (optional)
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
          {/* Use the custom header */}
          <ModalHeaderFeedback />

          {/* Content inside the modal */}
          <FeedbackForm email={email} />
        </Modal>
      </SupervisorLayout>
    </div>
  );
}
