import React from "react";
import { FiClock } from "react-icons/fi";

const UserDetailCard = ({
  icon,
  background,
  textColor,
  attendanceCount,
  status,
  msg1,
  msg2,
  check_in,
  check_out,
  current_date,
  attendanceTitle,
}) => {
  return (
    <div className={` card p-3 rounded-lg  bg-gray-300  `}>
      {/*  basic info start */}
      {attendanceCount && (
        <div className="flex items-center md:w-[220px] w-full">
          <div className="icon p-2 bg-gray-200 rounded-full text-center">
            {icon}
          </div>
          <div className="mx-2">
            <div className="mx-2 mb-2 "> {attendanceCount} </div>
            <div className="text-xs font-light"> {attendanceTitle} </div>
          </div>
        </div>
      )}
      {/* basic info end */}

      {/* attendance history start  */}
      {!attendanceCount && (
        <div className="md:w-[300px] w-full">
          <div className="flex justify-between mb-3">
            <div className="flex items-center">
              <div>
                {" "}
                <FiClock />{" "}
              </div>
              <div className="mx-2"> {current_date} </div>
            </div>
            <div
              className={`shadow-lg p-2 rounded-full text-xs font-bold text-center ${background} ${textColor}`}
            >
              {status}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="mb-2">
              <div className="text-xs mb-2 font-light text-gray-700">
                {" "}
                {msg1}{" "}
              </div>
              <div className="text-xs"> {check_in} </div>
            </div>
            <div className="mb-2">
              <div className="text-xs mb-2 font-light text-gray-700">
                {" "}
                {msg2}{" "}
              </div>
              <div className="text-xs"> {check_out} </div>
            </div>
          </div>
        </div>
      )}
      {/* attendance history end  */}
    </div>
  );
};

export default UserDetailCard;
