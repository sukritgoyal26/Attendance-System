import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

const SingleShiftDetail = ({ shift }) => {
  if (!shift) {
    // Handle case where shift prop is undefined or null
    return null;
  }

  const {
    shiftName,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = shift;

  const weekdays = [
    { name: "Mon", data: monday },
    { name: "Tue", data: tuesday },
    { name: "Wed", data: wednesday },
    { name: "Thu", data: thursday },
    { name: "Fri", data: friday },
    { name: "Sat", data: saturday },
    { name: "Sun", data: sunday },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center ">
      {weekdays.map((weekday, index) => (
        <div
          className="md:w-[230px] w-full mx-2 border border-gray-100 p-3 rounded my-2"
          key={index}
        >
          <div className="text-2xl font-medium mb-2">{shiftName}</div>
          <div key={index}>
            <div className="text-sm mb-2 text-lightText mb-5">
              {weekday.name}
            </div>
            <div
              className={`card ${
                weekday.data.isOffDay
                  ? "bg-orange-100 border-t-yellowColor"
                  : "bg-indigo-50 border-t-themeColor"
              }  rounded border-t-2  p-3`}
            >
              <div className="my-2 uppercase text-lightText text-xs font-bold">
                {weekday.data.isOffDay ? "Day Off" : "Working Hours"}
              </div>
              <div className="text-md font-normal mb-4">
                {!weekday.data.isOffDay && (
                  <>
                    {weekday.data.startTime} to {weekday.data.endTime}
                  </>
                )}
                {weekday.data.isOffDay && <>24 Hours off</>}
              </div>
              <div className="my-2 uppercase text-lightText text-xs">Hours</div>
              <div className="mb-2 flex items-center mb-4">
                <div
                  className={`${
                    weekday.data.isOffDay ? "bg-redColor" : "bg-greenColor"
                  }  p-1 text-xs text-white rounded-full`}
                >
                  {!weekday.data.isOffDay ? <FiCheck /> : <FiX />}
                </div>
                <div className="mx-2 text-md font-normal text-lightText">
                  {weekday.data.isOffDay
                    ? "N/A"
                    : weekday.data.workingHours.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
          <div className="md:mt-[200px] mt-[50px]">
            <hr />
            <div className="text-sm mb-2 text-lightText my-5">
              # of Employees:{" "}
              <span className="font-bold">{shift.usersCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleShiftDetail;
