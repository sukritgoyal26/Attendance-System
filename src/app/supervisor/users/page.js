"use client";
import React, { useState, useEffect } from "react";
import CircularProgressBar from "@/app/components/common/circularbar/page";
import { FaFileExport, FaFilter, FaSearch } from "react-icons/fa";
import UserCard from "@/app/components/usercard/page";
import { useDispatch } from "react-redux";
import SupervisorLayout from "@/app/components/layouts/supervisorlayout/page";
import { fetchUsers } from "@/store/reducer/supervisor/fetchUsersReducer";

const Users = () => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  //  to fetch users
  useEffect(() => {
    // Dispatch the action to fetch users
    dispatch(fetchUsers())
      .then((response) => {
        // Assuming response.data is an array of users
        setUsers(response.data.users);
        console.log(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // to calculate percentage

  const calculatePercentage = (attendance, status) => {
    const totalAttendance = attendance.length;

    if (status === "checkIn") {
      const onLeaveCount = attendance.filter(
        (record) =>
          record.status !== "On Leave" &&
          record.status !== "Absent" &&
          record.checkIn &&
          !record.checkOut
      ).length;
      return totalAttendance > 0 ? (onLeaveCount / totalAttendance) * 100 : 0;
    }

    if (status === "checkOut") {
      const onLeaveCount = attendance.filter(
        (record) =>
          record.status !== "On Leave" &&
          record.status !== "Absent" &&
          record.checkIn &&
          record.checkOut
      ).length;
      return totalAttendance > 0 ? (onLeaveCount / totalAttendance) * 100 : 0;
    }

    if (status === "On Leave") {
      const onLeaveCount = attendance.filter(
        (record) => record.status === "On Leave"
      ).length;
      return totalAttendance > 0 ? (onLeaveCount / totalAttendance) * 100 : 0;
    }

    if (status === "Absent") {
      const absentCount = attendance.filter(
        (record) => record.status === "Absent"
      ).length;
      return totalAttendance > 0 ? (absentCount / totalAttendance) * 100 : 0;
    }

    return 0; // Default value
  };

  return (
    <SupervisorLayout>
      <div className=" bg-card flex flex-wrap justify-center">
        <CircularProgressBar
          percentage={calculatePercentage(
            users.flatMap((user) => user.attendance),
            "checkIn"
          )}
          color="#29CC6A"
          title="Checked In"
        />
        <CircularProgressBar
          percentage={calculatePercentage(
            users.flatMap((user) => user.attendance),
            "checkOut"
          )}
          color="#FC5555"
          title="Checked Out"
        />
        <CircularProgressBar
          percentage={calculatePercentage(
            users.flatMap((user) => user.attendance),
            "On Leave"
          )}
          color="#F2C94C"
          title="On Leave"
        />
        <CircularProgressBar
          percentage={calculatePercentage(
            users.flatMap((user) => user.attendance),
            "Absent"
          )}
          color="#4b5563"
          title="Absent"
        />
      </div>
      <div className="p-2 flex items-center justify-between ">
        <div className="flex items-center mx-2">
          <div>Users</div>
          <div className="mx-2">
            {" "}
            <form action="#" method="GET" className="hidden lg:block lg:pl-2">
              <label for="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="bg-card border border-card text-textColor sm:text-sm rounded-lg focus:outline-none  block w-full pl-10 p-2.5 "
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
        </div>
        <div className=" flex items-center">
          <button
            className="mx-2  bg-transparent border border-card  text-lightText rounded-[14px] p-3 float-right md:flex md:items-center md:justify-center"
            // onClick={openFilterModal}
          >
            <FaFilter className="mx-2 hidden md:block" />
            Filter
          </button>
          <button
            className="mx-2  bg-card border border-card  text-lightText rounded-[14px] p-3 float-right md:flex md:items-center md:justify-center"
            // onClick={openFilterModal}
          >
            <FaFileExport className="mx-2 hidden md:block" />
            Export
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md ">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-textColor uppercase bg-card">
            <tr>
              <th scope="col" className="px-6 py-3">
                Check In
              </th>
              <th scope="col" className="px-6 py-3">
                Check out
              </th>
              <th scope="col" className="px-6 py-3">
                On leave
              </th>
              <th scope="col" className="px-6 py-3">
                Absent
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-card border-b">
              <td className="px-6 py-4">
                {users.map((user) => (
                  <div key={user._id}>
                    {user.attendance
                      .filter(
                        (attendance) =>
                          attendance.checkIn &&
                          !attendance.checkOut &&
                          attendance.status !== "Absent" &&
                          attendance.status !== "On Leave"
                      )
                      .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
                      .map((latestAttendance) => (
                        <UserCard
                          key={latestAttendance._id}
                          btnColor="bg-greenColor"
                          name={user.firstName + " " + user.lastName}
                          email={user.email}
                          status={`Check In At ${new Date(
                            latestAttendance.checkIn
                          ).toLocaleTimeString()}`}
                        />
                      ))}
                  </div>
                ))}
              </td>

              <td className="px-6 py-4">
                {users.map((user) => (
                  <div key={user._id}>
                    {user.attendance
                      .filter(
                        (attendance) =>
                          attendance.checkIn &&
                          attendance.checkOut &&
                          attendance.status !== "Absent" &&
                          attendance.status !== "On Leave"
                      )
                      .sort(
                        (a, b) => new Date(b.checkOut) - new Date(a.checkOut)
                      )
                      .slice(0, 1) // Keep only the latest attendance record
                      .map((latestAttendance) => (
                        <UserCard
                          key={latestAttendance._id}
                          btnColor="bg-redColor"
                          name={user.firstName + " " + user.lastName}
                          email={user.email}
                          status={`Check Out At ${new Date(
                            latestAttendance.checkOut
                          ).toLocaleTimeString()}`}
                        />
                      ))}
                  </div>
                ))}
              </td>

              <td className="px-6 py-4">
                {users.map((user) => (
                  <div key={user._id}>
                    {user.attendance
                      .filter((attendance) => attendance.status === "On Leave")
                      .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
                      .slice(0, 1) // Keep only the latest "On Leave" attendance record
                      .map((latestAttendance) => (
                        <UserCard
                          key={latestAttendance._id}
                          btnColor="bg-yellowColor"
                          name={user.firstName + " " + user.lastName}
                          email={user.email}
                          status="On Leave"
                        />
                      ))}
                  </div>
                ))}
              </td>

              <td className="px-6 py-4">
                {users.map((user) => (
                  <div key={user._id}>
                    {user.attendance
                      .filter((attendance) => attendance.status === "Absent")
                      .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
                      .slice(0, 1) // Keep only the latest "Absent" attendance record
                      .map((latestAttendance) => (
                        <UserCard
                          key={latestAttendance._id}
                          btnColor="bg-lightText"
                          name={user.firstName + " " + user.lastName}
                          email={user.email}
                          status="Absent"
                        />
                      ))}
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SupervisorLayout>
  );
};

export default Users;
