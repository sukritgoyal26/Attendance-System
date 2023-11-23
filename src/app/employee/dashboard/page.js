"use client";
import React, { useState, useEffect } from "react";
import LineChart from "@/app/components/attendancechart/page";
import CircularProgressBar from "@/app/components/common/circularbar/page";
import EmployeeAttendanceCard from "@/app/components/employee/employeeattendancecard/page";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiCalendar,
  FiClock,
  FiCoffee,
  FiLogIn,
  FiLogOut,
  FiMonitor,
} from "react-icons/fi";
import EmployeeLayout from "@/app/components/layouts/employeelayout/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { markAttendance } from "@/store/reducer/user/markattendanceReducer";
import { fetchAttendanceDetail } from "@/store/reducer/user/singleAttendanceDetailReducer";
import CurrentDate from "@/app/components/common/currentdate/page";

const Dashboard = () => {
  let attendanceDetails = null;

  const [checkinTime, setCheckinTime] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [onBreak, setOnBreak] = useState(false); // Initialize onBreak as false
  const dispatch = useDispatch();

  // Function to show attendance status as a toast
  const showAttendanceStatusToast = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Function to format time in 12-hour format (e.g., 8:00 A.M.)
  const formatTimeIn12HourFormat = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "P.M" : "A.M";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };

  // Function to calculate total working hours and represent in 12-hour format
  const calculateTotalWorkingHours = (totalTimeInSeconds) => {
    const totalHours = Math.floor(totalTimeInSeconds / 3600);
    const totalMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const formattedHours = totalHours.toString().padStart(2, "0");
    const formattedMinutes = totalMinutes.toString().padStart(2, "0");
    return `${formattedHours}h ${formattedMinutes}m`;
  };

  // for check in
  const handleCheckIn = () => {
    const action = { action: "check-in" };
    dispatch(markAttendance(action))
      .then((response) => {
        // Extract the response data from the 'data' property
        const responseData = response;
        console.log(response);
        const checkinTime = responseData.data.checkIn;
        setCheckinTime(checkinTime);

        if (responseData === undefined) {
          showAttendanceStatusToast("Already Checked In");
        } else {
          showAttendanceStatusToast(responseData.data.message);
        }
      })
      .catch((error) => {
        console.log("attendance marking failed:", error.message);
      });
  };

  // for break start
  const handleBreakStart = async () => {
    const action = { action: "break-start" };
    dispatch(markAttendance(action))
      .then((response) => {
        // Extract the response data from the 'data' property
        const responseData = response;
        if (responseData !== undefined) {
          setOnBreak(true);
          showAttendanceStatusToast(responseData.data.message);
        } else {
          showAttendanceStatusToast(
            "You are not checked in. Cannot start break."
          );
        }
      })
      .catch((error) => {
        console.log("attendance marking failed:", error.message);
      });
  };

  // for break end
  const handleBreakEnd = async () => {
    const action = { action: "break-end" };
    dispatch(markAttendance(action))
      .then((response) => {
        // Extract the response data from the 'data' property
        const responseData = response;
        console.log(responseData);
        setOnBreak(false);
        showAttendanceStatusToast(responseData.data.message);
      })
      .catch((error) => {
        console.log("attendance marking failed:", error.message);
      });
  };

  // for checkout
  const handleCheckOut = async () => {
    const action = { action: "check-out" };
    dispatch(markAttendance(action))
      .then((response) => {
        // Extract the response data from the 'data' property
        const responseData = response;
        if (responseData) {
          showAttendanceStatusToast(responseData.data.message);
          setTotalTime(responseData.data.totalTime);
        } else {
          showAttendanceStatusToast("Already Checked Out");
        }
      })
      .catch((error) => {
        console.log("attendance marking failed:", error.message);
      });
  };

  // Get the current time in 12-hour format
  const currentTime = formatTimeIn12HourFormat(new Date());
  // to get checkin Time in seconds
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  // Fetch the attendance details for the current date on component mount
  useEffect(() => {
    dispatch(fetchAttendanceDetail()).then((response) => {
      if (response && response.data && response.data.attendance) {
        setCheckinTime(response.data.attendance.checkIn);
        console.log(response.data.attendance.breaks);
        // check in time in seconds
        const checkInDate = new Date(checkinTime);
        const checkinTimeInSeconds = Math.floor(checkInDate / 1000);

        // Check if the last element of breaks array has breakEndTime as null
        if (
          response.data.attendance.breaks.length > 0 &&
          response.data.attendance.breaks[
            response.data.attendance.breaks.length - 1
          ].breakEndTime === null
        ) {
          setOnBreak(true);
        } else {
          setOnBreak(false);
        }
        if (response.data.attendance.totalTime) {
          setTotalTime(response.data.attendance.totalTime);
        } else {
          console.log("c", currentTimeInSeconds, "t", checkinTimeInSeconds);
          setTotalTime(currentTimeInSeconds - checkinTimeInSeconds);
        }
      }
    });
  }, []);

  // Format the check-in time in 12-hour format or show the current time if not checked in
  const formattedCheckinTime = checkinTime
    ? formatTimeIn12HourFormat(checkinTime)
    : currentTime;

  // Calculate the total working hours in 12-hour format
  const formattedTotalWorkingTime = calculateTotalWorkingHours(totalTime);

  return (
    <EmployeeLayout>
      <div className="bg-card p-2 m-2 rounded-lg mb-5">
        <div className="flex justify-between items-center my-2">
          <BreadCrumb text="Welcome" />
          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg" style={{backgroundColor:"black"}}>
            <FiCalendar className="text-white mx-2" /> <CurrentDate />
          </button>
        </div>

        <hr className="mb-5"></hr>
        <div className="flex flex-wrap justify-center p-3">
          {!onBreak ? (
            <EmployeeAttendanceCard
              textColor="text-white"
              bgColor="bg-[#82b29a]"
              icon={<FiLogIn />}
              time={
                checkinTime
                  ? formattedCheckinTime
                  : attendanceDetails?.checkIn || currentTime
              }
              cardTitle={
                checkinTime || attendanceDetails?.checkIn
                  ? "Checked in"
                  : "Not Checked In"
              }
              onClick={handleCheckIn}
            />
          ) : null}
          {onBreak ? (
            // Show this card when onBreak is true
            <EmployeeAttendanceCard
              textColor="text-white"
              bgColor="bg-[#fb7185]"
              icon={<FiMonitor />}
              time="01h 45m"
              cardTitle="Back To Work"
              onClick={handleBreakEnd} // Call handleBreakEnd when clicked
            />
          ) : (
            // Show this card when onBreak is false
            <EmployeeAttendanceCard
              textColor="text-textColor"
              bgColor="bg-[#ffe4e6]"
              icon={<FiCoffee />}
              time="01h 45m"
              cardTitle="Break"
              onClick={handleBreakStart} // Call handleBreakStart when clicked
            />
          )}
          {checkinTime !== "" && (
            <EmployeeAttendanceCard
              textColor="text-textColor"
              bgColor="bg-[#ffedd5]"
              icon={<FiLogOut />}
              time="6:00 P.M"
              cardTitle="Check out"
              onClick={handleCheckOut}
            />
          )}
          <EmployeeAttendanceCard
            textColor="text-textColor"
            bgColor="bg-[#e0e7ff]"
            icon={<FiClock />}
            time={formattedTotalWorkingTime}
            cardTitle="Working hours"
          />
          <ToastContainer />
        </div>
      </div>
      
    </EmployeeLayout>
  );
};

export default Dashboard;
