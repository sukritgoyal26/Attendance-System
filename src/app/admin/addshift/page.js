"use client";
import React, { useState } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import { FiCalendar, FiUserPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { useDispatch } from "react-redux";
import CurrentDate from "@/app/components/common/currentdate/page";
import { addShift } from "@/store/reducer/admin/addShiftReducer";

const AddShifts = () => {
  const [offDays, setOffDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const shiftData = {
      shiftName: data.shiftName,
      monday: {
        startTime: data.startTimeMonday,
        endTime: data.endTimeMonday,
        isOffDay: offDays.monday,
      },
      tuesday: {
        startTime: data.startTimeTuesday,
        endTime: data.endTimeTuesday,
        isOffDay: offDays.tuesday,
      },
      wednesday: {
        startTime: data.startTimeWednesday,
        endTime: data.endTimeWednesday,
        isOffDay: offDays.wednesday,
      },
      thursday: {
        startTime: data.startTimeThursday,
        endTime: data.endTimeThursday,
        isOffDay: offDays.thursday,
      },
      friday: {
        startTime: data.startTimeFriday,
        endTime: data.endTimeFriday,
        isOffDay: offDays.friday,
      },
      saturday: {
        startTime: data.startTimeSaturday,
        endTime: data.endTimeSaturday,
        isOffDay: offDays.saturday,
      },
      sunday: {
        startTime: data.startTimeSunday,
        endTime: data.endTimeSunday,
        isOffDay: offDays.sunday,
      },
    };

    console.log(shiftData);
    // Dispatch the addShift action with the transformed shift data
    await dispatch(addShift(shiftData));
  };

  const handleOffDayChange = (day) => {
    setOffDays((prevOffDays) => ({
      ...prevOffDays,
      [day]: !prevOffDays[day],
    }));
    if (offDays[day]) {
      setValue(`startTime${day.charAt(0).toUpperCase() + day.slice(1)}`, "");
      setValue(`endTime${day.charAt(0).toUpperCase() + day.slice(1)}`, "");
    }
  };

  return (
    <SuperuserLayout>
      <div className="m-2 p-2">
        <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
          <BreadCrumb text="Add Shift" />
          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg" style={{backgroundColor:"black"}}>
            <FiCalendar className="text-white mx-2" /> <CurrentDate />
          </button>
        </div>

        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="shiftName"
              className="block mb-2 text-sm font-medium text-textColor "
            >
              Shift Name
            </label>
            <input
              type="text"
              id="shiftName"
              {...register("shiftName")}
              className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              placeholder="Morning"
            />
          </div>

          {/* Monday */}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-3">
            <div className="mb-6 ">
              <label
                htmlFor="startTimeMonday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Start Time Monday
              </label>
              <input
                type="time"
                id="startTimeMonday"
                {...register("startTimeMonday")}
                className=" bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                disabled={offDays.monday}
              />
            </div>
            <div>
              <label
                htmlFor="endTimeMonday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                End Time Monday
              </label>
              <input
                type="time"
                id="endTimeMonday"
                {...register("endTimeMonday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                disabled={offDays.monday}
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={offDays.monday}
                  onChange={() => handleOffDayChange("monday")}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-textColor">
                  Off Day
                </span>
              </label>
            </div>
          </div>

          {/* Tuesday */}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label
                htmlFor="startTimeTuesday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Start Time Tuesday
              </label>
              <input
                type="time"
                id="startTimeTuesday"
                {...register("startTimeTuesday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                htmlFor="endTimeTuesday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                End Time Tuesday
              </label>
              <input
                type="time"
                id="endTimeTuesday"
                {...register("endTimeTuesday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={offDays.tuesday}
                  onChange={() => handleOffDayChange("tuesday")}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-textColor">
                  Off Day
                </span>
              </label>
            </div>
          </div>

          {/* Wednesday */}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label
                htmlFor="startTimeWednesday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Start Time Wednesday
              </label>
              <input
                type="time"
                id="startTimeWednesday"
                {...register("startTimeWednesday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                htmlFor="endTimeWednesday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                End Time Wednesday
              </label>
              <input
                type="time"
                id="endTimeWednesday"
                {...register("endTimeWednesday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={offDays.wednesday}
                  onChange={() => handleOffDayChange("wednesday")}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-textColor">
                  Off Day
                </span>
              </label>
            </div>
          </div>

          {/* Thursday */}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label
                htmlFor="startTimeThursday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Start Time Thursday
              </label>
              <input
                type="time"
                id="startTimeThursday"
                {...register("startTimeThursday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                htmlFor="endTimeThursday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                End Time Thursday
              </label>
              <input
                type="time"
                id="endTimeThursday"
                {...register("endTimeThursday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={offDays.thursday}
                  onChange={() => handleOffDayChange("thursday")}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-textColor">
                  Off Day
                </span>
              </label>
            </div>
          </div>

          {/* Friday */}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label
                htmlFor="startTimeFriday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Start Time Friday
              </label>
              <input
                type="time"
                id="startTimeFriday"
                {...register("startTimeFriday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                htmlFor="endTimeFriday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                End Time Friday
              </label>
              <input
                type="time"
                id="endTimeFriday"
                {...register("endTimeFriday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={offDays.friday}
                  onChange={() => handleOffDayChange("friday")}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-textColor">
                  Off Day
                </span>
              </label>
            </div>
          </div>

          {/* Saturday */}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label
                htmlFor="startTimeSaturday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Start Time Saturday
              </label>
              <input
                type="time"
                id="startTimeSaturday"
                {...register("startTimeSaturday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                htmlFor="endTimeSaturday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                End Time Saturday
              </label>
              <input
                type="time"
                id="endTimeSaturday"
                {...register("endTimeSaturday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={offDays.saturday}
                  onChange={() => handleOffDayChange("saturday")}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-textColor">
                  Off Day
                </span>
              </label>
            </div>
          </div>

          {/* Sunday */}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label
                htmlFor="startTimeSunday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Start Time Sunday
              </label>
              <input
                type="time"
                id="startTimeSunday"
                {...register("startTimeSunday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                htmlFor="endTimeSunday"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                End Time Sunday
              </label>
              <input
                type="time"
                id="endTimeSunday"
                {...register("endTimeSunday")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={offDays.sunday}
                  onChange={() => handleOffDayChange("sunday")}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-textColor">
                  Off Day
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
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

export default AddShifts;
