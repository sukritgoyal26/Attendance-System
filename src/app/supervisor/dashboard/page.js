"use client";
import React, { useState, useEffect } from "react";
import LineChart from "@/app/components/attendancechart/page";
import {
  FiClock,
  FiCoffee,
  FiLogIn,
  FiLogOut,
  FiMonitor,
  FiUserCheck,
} from "react-icons/fi";
import SupervisorLayout from "@/app/components/layouts/supervisorlayout/page";
import EmployeeAttendanceCard from "@/app/components/employee/employeeattendancecard/page";
import { markAttendance } from "@/store/reducer/user/markattendanceReducer";
import { fetchAttendanceDetail } from "@/store/reducer/user/singleAttendanceDetailReducer";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers } from "@/store/reducer/supervisor/fetchUsersReducer";
import CurrentDate from "@/app/components/common/currentdate/page";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
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

  // Count the total users and users with check-in
  const totalUsers = users.length;
  const usersWithCheckIn = users.filter(
    (user) => user.attendance && user.attendance.length > 0
  ).length;

  // fetch users
  useEffect(() => {
    // Dispatch the action to fetch users
    dispatch(fetchUsers())
      .then((response) => {
        // Assuming response.data is an array of users
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Format the check-in time in 12-hour format or show the current time if not checked in
  const formattedCheckinTime = checkinTime
    ? formatTimeIn12HourFormat(checkinTime)
    : currentTime;

  // Calculate the total working hours in 12-hour format
  const formattedTotalWorkingTime = calculateTotalWorkingHours(totalTime);

  // to fetch time like 2 min ago , 10 min ago etc
  const formatTimeDifference = (timestamp) => {
    const currentTime = new Date();
    const checkInTime = new Date(timestamp);
    const timeDifferenceInSeconds = Math.floor(
      (currentTime - checkInTime) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} sec ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hour ago`;
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} day ago`;
    }
  };
  return (
    <SupervisorLayout>
      <div className="md:flex ">
        {/* Use the CustomSidebar component with the necessary props */}
        <div className="w-full md:w-9/12">
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
          <div className=" mx-2  my-2 flex justify-center bg-card rounded-lg shadow  ">
            <LineChart role="Employees" color="#29CC6A" shadowColor="#dcfce7" />
          </div>
        </div>
        <div className="w-full md:w-3/12 mx-3 p-3 border border-r-0 border-t-0 border-b-0 border-gray-300">
          {/* total attendance  */}
          <div className="mt-5">
            <div className="text-textColor font-bold mb-2">
              Today's Attendance{" "}
            </div>
            <div className="text-gray-500 font-light text-sm mb-5 ">
              <CurrentDate />{" "}
            </div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-full">
                <FiUserCheck className="text-greenColor w-[25px] h-[25px]" />
              </div>
              <div className="mx-3">
                <div className="text-textColor font-light mb-2">Employees</div>
                <div className="text-greenColor font-medium text-sm  ">
                  {usersWithCheckIn}/{totalUsers}
                </div>
              </div>
            </div>
          </div>

          {/* recent attendance  */}
          <div className="mt-5">
            <div className="text-textColor font-bold mb-5">
              Recent Attendance
            </div>

            {users
              .filter((user) => user.attendance.length > 0) // Filter users with check-ins
              .map((user) => {
                const latestAttendance = user.attendance
                  .filter((attendance) => attendance.checkIn)
                  .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))[0]; // Get the latest attendance record

                return latestAttendance ? (
                  <div className="flex items-center mb-4" key={user._id}>
                    <div className="">
                      <img
                        className="w-[40px] h-[40px] mb-3 rounded-full shadow-lg"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdMBviWKCk0hSEFULTZepZeTLRiB6u5MACg&usqp=CAU"
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                    </div>
                    <div className="mx-3">
                      <div className="text-textColor font-light">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-gray-400 font-medium text-sm mb-2">
                        Employee
                      </div>
                      <div className="text-gray-400 font-light text-sm">
                        {formatTimeDifference(latestAttendance.checkIn)}
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
          </div>
        </div>
      </div>
    </SupervisorLayout>
  );
};

export default Dashboard;
