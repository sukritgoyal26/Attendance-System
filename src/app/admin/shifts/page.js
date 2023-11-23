"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import CurrentDate from "@/app/components/common/currentdate/page";
import ShiftDetail from "@/app/components/common/shiftdetail/page";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import { FiCalendar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchShifts } from "@/store/reducer/admin/fetchShiftsReducer";

const Shifts = () => {
  const [shiftList, setshiftList] = useState([]);
  const dispatch = useDispatch();
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
      <div className="mx-2 my-2">
        <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
          <BreadCrumb text="Add Shift" />
          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg" style={{backgroundColor:"black"}}>
            <FiCalendar className="text-white mx-2" /> <CurrentDate />
          </button>
        </div>
        <div className="my-2">
          {shiftList.map((shift) => (
            <ShiftDetail key={shift._id} shift={shift} />
          ))}
        </div>
      </div>
    </SuperuserLayout>
  );
};

export default Shifts;
