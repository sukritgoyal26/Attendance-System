import React from "react";
import SingleShiftDetail from "../singleshiftdetail/page";

const ShiftDetail = ({ shift }) => {
  if (!shift) {
    // Handle case where shift prop is undefined or null
    return null;
  }
  return (
    <div className="my-2 p-2 border rounded ">
      {" "}
      <SingleShiftDetail shift={shift} />
    </div>
  );
};

export default ShiftDetail;
