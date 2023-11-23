"use client";
import React, { useState, useEffect } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import FilterResult from "@/app/components/common/filterresult/page";
import EmployeeLayout from "@/app/components/layouts/employeelayout/page";
import LeaveRequestForm from "@/app/components/leaverequestform/page";
import UserDetailCard from "@/app/components/userdetailcard/page";
import { fetchUserLeaves } from "@/store/reducer/user/viewLeavesReducer";
import { FaBars, FaPen, FaSort } from "react-icons/fa";
import { FiFilter, FiGrid } from "react-icons/fi";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

const Leaves = () => {
  const [isModalOpenLeaves, setIsModalOpenLeaves] = useState(false);
  const [isModalOpenFilter, setIsModalOpenFilter] = useState(false);
  const dispatch = useDispatch();
  // to get all leaves
  useEffect(() => {
    dispatch(fetchUserLeaves());
  }, [dispatch]);

  // Use useSelector to access Redux state
  const userLeaves = useSelector((state) => state.viewLeaves.userLeaves);
  const loading = useSelector((state) => state.viewLeaves.loading);
  const error = useSelector((state) => state.viewLeaves.error);

  
  //  grid mode
  const [isGridMode, setIsGridMode] = useState(true);

  // Event handler for toggling layout mode
  const toggleLayoutMode = () => {
    setIsGridMode((prevMode) => !prevMode);
  };

  // Function to open the Leave modal
  const openModalLeaves = () => {
    setIsModalOpenLeaves(true);
  };

  // Function to close the Leave modal
  const closeModalLeaves = () => {
    setIsModalOpenLeaves(false);
  };

  // Function to open the Filter modal
  const openModalFilter = () => {
    setIsModalOpenFilter(true);
  };

  // Function to close the Filter modal
  const closeModalFilter = () => {
    setIsModalOpenFilter(false);
  };

  // Custom header for the Leave modal
  const ModalHeaderLeaves = () => (
    <div
      className="p-2 border-b border-gray-300"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <BreadCrumb text="Leave Request" />

      <button
        onClick={closeModalLeaves}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        x
      </button>
    </div>
  );

  // Custom header for the Filter modal
  const ModalHeaderFilter = () => (
    <div
      className="p-2 border-b border-gray-300"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <BreadCrumb text="Filter" />

      <button
        onClick={closeModalFilter}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        x
      </button>
    </div>
  );

  // user detail cards for map
  const userDetailCards = userLeaves.map((leave) => {
    // Parse fromDate and toDate strings into Date objects
    const fromDate = new Date(leave.fromDate);
    const toDate = new Date(leave.toDate);
    const createdAt = new Date(leave.createdAt);

    // Format fromDate and toDate and createdAt Date
    const formattedFromDate = fromDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedToDate = toDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedCreatedAtDate = createdAt.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return {
      textColor:
        leave.status === "Approved"
          ? "text-greenColor"
          : leave.status === "Pending"
          ? "text-yellowColor"
          : "text-redColor",
      background:
        leave.status === "Approved"
          ? "bg-green-100"
          : leave.status === "Pending"
          ? "bg-yellow-100"
          : "bg-red-100",
      status: leave.status,
      fromDate: formattedFromDate, // Add formatted fromDate
      toDate: formattedToDate, // Add formatted toDate
      createdAt: formattedCreatedAtDate, // Add formatted created At Date
    };
  });

  // pagination

  const [currentPage, setCurrentPage] = useState(0);
  const CardsPerPage = 9;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderCards = () => {
    const startIndex = currentPage * CardsPerPage;
    const endIndex = startIndex + CardsPerPage;
    const currentCards = userDetailCards.slice(startIndex, endIndex);

    return currentCards.map((card, index) => (
      <div key={index} className="mb-2">
        <UserDetailCard
          msg1="From Date"
          msg2="To Date"
          current_date={card.createdAt}
          check_in={card.fromDate}
          check_out={card.toDate}
          textColor={card.textColor}
          background={card.background}
          status={card.status}
        />
      </div>
    ));
  };

  return (
    <EmployeeLayout>
      <div className="bg-card p-2 m-2 rounded-lg mb-5">
        <div className="flex justify-between items-center my-2">
          <BreadCrumb text="Leaves" />
          <button
            className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
            style={{backgroundColor:"black"}}
            onClick={openModalLeaves}
          >
            <FaPen className="text-white mx-2" /> Leave Request
          </button>
        </div>
      </div>
      <div className="card rounded-lg shadow bg-card p-2 my-2 mx-2">
        <div className="flex justify-between items-center my-2">
          <BreadCrumb text="Leaves History" />
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
            <button
              className="mx-1 flex items-center text-white text-sm text-center bg-textColor p-2 rounded-lg"
              onClick={openModalFilter}
            >
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

      {/* Pagination */}
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        pageCount={Math.ceil(userDetailCards.length / CardsPerPage)}
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

      {/* The Leave Modal component */}
      <Modal
        isOpen={isModalOpenLeaves}
        onRequestClose={closeModalLeaves}
        contentLabel="Leave Request Modal"
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
        <ModalHeaderLeaves />

        {/* Content inside the modal */}
        <LeaveRequestForm />
      </Modal>

      {/* The Filter Modal component */}
      <Modal
        isOpen={isModalOpenFilter}
        onRequestClose={closeModalFilter}
        contentLabel="Filter Modal"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={true}
        // Style the modal (optional)
        style={{
          content: {
            margin: "auto",
            borderRadius: "8px",
            zIndex: 10,
            width: "310px",
          },
          overlay: {
            zIndex: 9,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {/* Use the custom header */}
        <ModalHeaderFilter />

        {/* Content inside the modal */}
        <FilterResult />
      </Modal>
    </EmployeeLayout>
  );
};

export default Leaves;
