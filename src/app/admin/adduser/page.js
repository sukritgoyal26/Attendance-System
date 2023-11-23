"use client";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import React, { useEffect, useState } from "react";
import { FiCalendar, FiUserPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { addUser } from "@/store/reducer/admin/addUserReducer";
import { useDispatch } from "react-redux";
import CurrentDate from "@/app/components/common/currentdate/page";
import { fetchTeamLeads } from "@/store/reducer/admin/fetchTeamLeadsReducer";
import { fetchShifts } from "@/store/reducer/admin/fetchShiftsReducer";

const AddUser = () => {
  const [userType, setUserType] = useState("");
  const [teamLead, setTeamLead] = useState(false);
  const [teamLeadList, setTeamLeadList] = useState([]);
  const [shiftList, setshiftList] = useState([]);

  // // for image
  // const [image, setImage] = useState(null);
  // const uploadToClient = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const i = event.target.files[0];

  //     setImage(i);
  //   }
  // };

  const handleUserType = (event) => {
    setUserType(event.target.value);

    if (event.target.value === "employee") {
      setTeamLead(false);
    } else {
      setTeamLead(true);
    }
  };

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    data.teamLead = teamLead;
    data.employeeType = userType;

    // Dispatch the addBlog action with the form data and headers
    await dispatch(addUser(data));
  };

  // to fetch team leads
  useEffect(() => {
    // Dispatch the action to fetch team leads
    dispatch(fetchTeamLeads())
      .then((response) => {
        // Assuming response.data is an array of team leads
        setTeamLeadList(response.data.allTeamLeads);
      })
      .catch((error) => {
        console.error("Error fetching team leads:", error);
      });
  }, []);
  //  to fetch shifts
  useEffect(() => {
    // Dispatch the action to fetch shifts
    dispatch(fetchShifts())
      .then((response) => {
        // Assuming response.data is an array of shifts
        setshiftList(response.data.allShifts);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shifts:", error);
      });
  }, []);

  return (
    <SuperuserLayout>
      <div className="m-2 p-2">
        <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
          <BreadCrumb text="Add user" />
          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg" style={{backgroundColor:"black"}}>
            <FiCalendar className="text-white mx-2" /> <CurrentDate />
          </button>
        </div>

        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              for="employeeType"
              className="block mb-2 text-sm font-medium text-textColor"
            >
              Select User to Add
            </label>
            <select
              id="employeeType"
              className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5"
              onChange={handleUserType}
            >
              <option disabled selected>
                Select User Type
              </option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* <div>
            <label
              className="block mb-2 text-sm font-medium text-textColor "
              for="userImage"
            >
              Upload file
            </label>
            <input
              className="p-2 block w-full text-sm text-textColor border border-card rounded-lg cursor-pointer bg-card  focus:outline-none "
              aria-describedby="userImage_help"
              id="userImage"
              type="file"
              onChange={uploadToClient}
            />
            <p className="mt-1 text-sm text-lightText" id="user_image_help">
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>
          </div> */}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="firstName"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="First Name"
              />
            </div>
            <div>
              <label
                for="lastName"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              for="userEmail"
              className="block mb-2 text-sm font-medium text-textColor "
            >
              Email
            </label>
            <input
              type="email"
              {...register("userEmail")}
              id="userEmail"
              className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              placeholder="Enter Your Email"
            />
          </div>
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label
                for="userPassword"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Password
              </label>
              <input
                type="password"
                id="userPassword"
                {...register("userPassword")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="******"
              />
            </div>
            <div>
              <label
                for="confirmPassword"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="******"
              />
            </div>
          </div>
          {userType === "employee" && (
            <div className="mb-6">
              <label
                htmlFor="teamLeadEmail"
                className="block mb-2 text-sm font-medium text-textColor"
              >
                Select Team Lead (Supervisor)
              </label>
              <select
                id="teamLeadEmail"
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5"
                {...register("teamLeadEmail")}
              >
                <option value="" disabled selected>
                  Choose a team lead
                </option>
                {teamLeadList &&
                  teamLeadList.map((teamLead) => (
                    <option key={teamLead._id} value={teamLead.email}>
                      {teamLead.firstName} {teamLead.lastName}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="department"
                className="block mb-2 text-sm font-medium text-textColor"
              >
                Department
              </label>
              <select
                id="department"
                {...register("department")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5"
              >
                <option selected>Choose a department</option>
                <option value="IN">India</option>
                <option value="CA">Canada</option>

              </select>
            </div>
            <div>
              <label
                for="shift"
                className="block mb-2 text-sm font-medium text-textColor"
              >
                Shift
              </label>
              <select
                id="shift"
                {...register("shift")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5"
              >
                <option selected>Choose a shift</option>
                {shiftList &&
                  shiftList.map((shiftList) => (
                    <option key={shiftList._id} value={shiftList.shiftName}>
                      {shiftList.shiftName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg" style={{backgroundColor:"black"}}
          >
            <FiUserPlus className="text-white mx-2" /> Add User
          </button>
        </form>
      </div>
    </SuperuserLayout>
  );
};

export default AddUser;
