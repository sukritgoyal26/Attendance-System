"use client";
import React, { useState, useEffect } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import CircularProgressBar from "@/app/components/common/circularbar/page";
import { FaFileExport, FaFilter, FaSearch } from "react-icons/fa";
import UserCard from "@/app/components/usercard/page";
import { fetchUsers } from "@/store/reducer/admin/fetchUsersReducer";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  // to drag and drop cards
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(users);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setUsers(items);
  };

  return (
    <SuperuserLayout>
      {users && (
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
      )}
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
        <DragDropContext onDragEnd={onDragEnd}>
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
                  <Droppable droppableId="checkInColumn">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {users && users.map((user, userIndex) => (
                          <Draggable
                            key={user._id}
                            draggableId={user._id}
                            index={userIndex}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {user.attendance.map((attendance) =>
                                  attendance.checkIn &&
                                  !attendance.checkOut &&
                                  attendance.status !== "Absent" &&
                                  attendance.status !== "On Leave" ? (
                                    <UserCard
                                      key={attendance._id}
                                      btnColor="bg-greenColor"
                                      name={
                                        user.firstName + " " + user.lastName
                                      }
                                      email={user.email}
                                      status={`Check In At ${new Date(
                                        attendance.checkIn
                                      ).toLocaleTimeString()}`}
                                    />
                                  ) : null
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </td>
                <td className="px-6 py-4">
                  <Droppable droppableId="checkOutColumn">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {users && users.map((user, userIndex) => (
                          <Draggable
                            key={user._id}
                            draggableId={user._id}
                            index={userIndex}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <React.Fragment key={user._id}>
                                  {user.attendance.map((attendance) =>
                                    attendance.checkIn &&
                                    attendance.checkOut &&
                                    attendance.status !== "Absent" &&
                                    attendance.status !== "On Leave" ? (
                                      <UserCard
                                        key={attendance._id}
                                        btnColor="bg-redColor"
                                        name={
                                          user.firstName + " " + user.lastName
                                        }
                                        email={user.email}
                                        status={`Check Out At ${new Date(
                                          attendance.checkOut
                                        ).toLocaleTimeString()}`}
                                      />
                                    ) : null
                                  )}
                                </React.Fragment>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </td>

                <td className="px-6 py-4">
                  <Droppable droppableId="onLeaveColumn">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {users && users.map((user, userIndex) => (
                          <Draggable
                            key={user._id}
                            draggableId={user._id}
                            index={userIndex}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <React.Fragment key={user._id}>
                                  {user.attendance.map((attendance) =>
                                    attendance.status === "On Leave" ? (
                                      <UserCard
                                        key={attendance._id}
                                        btnColor="bg-yellowColor"
                                        name={
                                          user.firstName + " " + user.lastName
                                        }
                                        email={user.email}
                                        status="On Leave"
                                      />
                                    ) : null
                                  )}
                                </React.Fragment>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </td>
                <td className="px-6 py-4">
                  <Droppable droppableId="absentColumn">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {users && users.map((user, userIndex) => (
                          <Draggable
                            key={user._id}
                            draggableId={user._id}
                            index={userIndex}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <React.Fragment key={user._id}>
                                  {user.attendance.map((attendance) =>
                                    attendance.status === "Absent" ? (
                                      <UserCard
                                        key={attendance._id}
                                        btnColor="bg-lightText"
                                        name={
                                          user.firstName + " " + user.lastName
                                        }
                                        email={user.email}
                                        status="Absent"
                                      />
                                    ) : null
                                  )}
                                </React.Fragment>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </td>
              </tr>
            </tbody>
          </table>
        </DragDropContext>
      </div>
    </SuperuserLayout>
  );
};

export default Users;
