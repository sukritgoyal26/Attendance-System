"use client";
import React, { useState } from "react";

const FilterResult = () => {
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleStatusFilterChange = (status) => {
    // Check if the status is already selected
    if (selectedStatuses.includes(status)) {
      // If selected, remove it from the array
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      // If not selected, add it to the array
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const isStatusSelected = (status) => selectedStatuses.includes(status);

  return (
    <div>
      <div className="text-sm font-medium my-4">Type</div>
      <div className="flex justify-between flex-wrap mb-4">
        <div
          className={`cursor-pointer text-xs mx-1 p-2 rounded-full  
          ${
            isStatusSelected("Approved")
              ? "bg-themeColor text-white"
              : "border border-gray-300"
          }  `}
          onClick={() => handleStatusFilterChange("Approved")}
        >
          Approved
        </div>
        <div
          className={`cursor-pointer text-xs mx-1 p-2 rounded-full  
         ${
           isStatusSelected("Pending")
             ? "bg-themeColor text-white"
             : "border border-gray-300"
         }  `}
          onClick={() => handleStatusFilterChange("Pending")}
        >
          Pending
        </div>
        <div
          className={`cursor-pointer text-xs mx-1 p-2 rounded-full  
           ${
             isStatusSelected("Rejected")
               ? "bg-themeColor text-white"
               : "border border-gray-300"
           }  `}
          onClick={() => handleStatusFilterChange("Rejected")}
        >
          Rejected
        </div>
      </div>
      <div className="mb-4">
        <div className="w-full mb-2">
          <label
            htmlFor="from_date"
            className="block mb-2 text-sm font-medium text-textColor "
          >
            From
          </label>
          <input
            type="date"
            id="from_date"
            className="text-xs border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
          />
        </div>
        <div className="w-full mb-2">
          <label
            htmlFor="to_date"
            className="block mb-2 text-sm font-medium text-textColor "
          >
            To
          </label>
          <input
            type="date"
            id="to_date"
            className="text-xs border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
          />
        </div>
      </div>
      <div className="lg:absolute lg:bottom-2 lg:right-2 flex justify-end">
        <button className="mx-1 text-white text-sm text-center bg-textColor p-2 rounded-lg" style={{backgroundColor:"black"}}>
          Cancel
        </button>
        <button className="mx-1  text-white text-sm text-center bg-themeColor p-2 rounded-lg">
          Filter Results
        </button>
      </div>
    </div>
  );
};

export default FilterResult;
