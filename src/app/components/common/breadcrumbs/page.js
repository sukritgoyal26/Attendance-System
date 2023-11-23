import React from "react";

const BreadCrumb = (props) => {
  return (
    <div className="flex items-center">
      <div className="p-1 w-1 h-[30px] bg-themeColor rounded-lg shadow" style={{backgroundColor:"black"}}></div>
      <div className="text-textColor text-lg mx-2">{props.text}</div>
    </div>
  );
};

export default BreadCrumb;
