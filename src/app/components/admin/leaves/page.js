"use client";
import React, { useState, useEffect } from "react";
import { FiCheck, FiClock, FiInfo, FiShield, FiX } from "react-icons/fi";
import axios from "axios";
const LeavesList = ({ leaves }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [updatedLeaves, setUpdatedLeaves] = useState(leaves);

  // Create a mapping of status values to icon components and colors
  const iconMapping = {
    Pending: {
      icon: FiClock,
      color: "bg-yellow-50",
      bgColor: "bg-yellowColor",
    },
    Rejected: { icon: FiX, color: "bg-red-50", bgColor: "bg-redColor" },
    Approved: { icon: FiShield, color: "bg-blue-50", bgColor: "bg-themeColor" },
  };

  // api call
  const handleApproveOrReject = async (id, btnValue) => {
    try {
      const response = await axios.post(`/api/admin/updateleave`, {
        id,
        btnValue,
      });

      if (response.status === 200) {
        // Handle success

        const updatedLeave = response.data.updatedLeave;

        // Update the leave in the local state
        setUpdatedLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave._id === updatedLeave._id ? updatedLeave : leave
          )
        );

        // You might want to update your leave data here if needed
      } else {
        // Handle error
        console.error("Error updating leave status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };
  useEffect(() => {
    // Update the local state when the 'leaves' prop changes
    if (leaves) {
      setUpdatedLeaves(leaves);
    }
  }, [leaves]);

  return (
    <>
      {updatedLeaves  && updatedLeaves.map((leave, index) => {
        // Get the appropriate icon component and colors from the mapping
        const {
          icon: IconComponent,
          color,
          bgColor,
        } = iconMapping[leave.status] || {
          icon: FiInfo,
          color: "",
          bgColor: "",
        };

        // Format fromDate and toDate
        const formattedFromDate = new Date(leave.fromDate).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );
        const formattedToDate = new Date(leave.toDate).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );

        const isHovered = hoveredIndex === index;

        return (
          <div
            key={index}
            className={`cursor-pointer relative mx-2 my-2 rounded-lg p-3 border border-gray-300 ${color} ${
              isHovered ? "bg-opacity-75" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <div className={` card p-3 rounded-lg `}>
              {/* leave history start  */}
              <div className="md:w-[300px] w-full">
                <div className="flex justify-between mb-3">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full text-center ${bgColor} text-white`}
                    >
                      <IconComponent /> {/* Render the dynamic icon */}
                    </div>
                    <div className="mx-2"> {leave.userId.firstName} </div>
                  </div>
                  <div
                    className={`shadow-lg p-2 rounded-full text-xs font-bold text-center text-white ${bgColor} `}
                  >
                    {leave.status}
                  </div>
                </div>
                <div className="text-xs font-light my-2"> {leave.reason} </div>
                <div className="flex justify-between">
                  <div className="mb-2">
                    <div className="text-xs mb-2 font-light text-gray-700">
                      {" "}
                      From Date{" "}
                    </div>
                    <div className="text-xs"> {formattedFromDate} </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-xs mb-2 font-light text-gray-700">
                      {" "}
                      To Date{" "}
                    </div>
                    <div className="text-xs">{formattedToDate}</div>
                  </div>
                </div>
              </div>
              {/* leave history end  */}
              {isHovered && (
                <div className=" absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <button
                    className=" mx-1 bg-themeColor px-4 py-2 text-white rounded"
                    onClick={() => handleApproveOrReject(leave._id, "Approved")}
                  >
                    <span className="hidden md:block"> Approve</span>
                    <span className="block md:hidden">
                      {" "}
                      <FiCheck />
                    </span>
                  </button>
                  <button
                    className="mx-1 bg-redColor px-4 py-2 text-white rounded"
                    onClick={() => handleApproveOrReject(leave._id, "Rejected")}
                  >
                    <span className="hidden md:block"> Reject </span>
                    <span className="block md:hidden">
                      {" "}
                      <FiX />{" "}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LeavesList;
