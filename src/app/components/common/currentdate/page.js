import React from "react";

const CurrentDate = () => {
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return <div>{formattedDate}</div>;
};

export default CurrentDate;
