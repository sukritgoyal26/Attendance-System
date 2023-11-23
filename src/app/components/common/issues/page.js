import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

const ProblemLists = ({ reports }) => {
  return (
    <>
      {reports &&
        reports.map((report, index) => (
          <div
            key={index}
            className={`mx-2 my-2 rounded-lg p-3 border border-gray-300 ${
              report.status === "Resolved" ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-center p-1">
              <div
                className={`mx-1 p-2 rounded-full ${
                  report.status === "Resolved" ? "bg-greenColor" : "bg-redColor"
                }`}
              >
                {report.status === "Resolved" ? (
                  <FiCheck className="text-white" />
                ) : (
                  <FiX className="text-white" />
                )}
              </div>
              <div className="flex mx-1 items-center justify-between w-full">
                <div className="text-xs font-normal mb-1 ">
                  {report.message}
                </div>
                <div
                  className={`text-xs font-medium mb-1 rounded p-2 text-center text-card ${
                    report.status === "Resolved"
                      ? "bg-greenColor"
                      : "bg-redColor"
                  }`}
                >
                  {report.status}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProblemLists;
