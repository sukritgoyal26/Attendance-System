import React from "react";

const EmployeeAttendanceCard = ({
  textColor,
  bgColor,
  icon,
  time,
  cardTitle,
  onClick,
}) => {
  return (
    <div
      className={`transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer mx-2 my-2 rounded-lg ${textColor} ${bgColor} ${icon}  p-5`}
      onClick={onClick}
    >
      <div className="text-3xl my-3">{icon}</div>
      <div className="text-xl font-medium mb-1">{time}</div>
      <div className="text-xs font-normal mb-3">{cardTitle}</div>
    </div>
  );
};

export default EmployeeAttendanceCard;
