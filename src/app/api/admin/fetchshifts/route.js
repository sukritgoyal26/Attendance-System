// backend/pages/api/shifts.js


import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import ShiftModel from "../../../../../backend/models/Shift";
import UserModel from "../../../../../backend/models/User";

const fetchAllShiftsHandler = async () => {
  try {
    // Fetch all shifts
    const allShifts = await ShiftModel.find();

    // Create an object to store shift counts
    const shiftCounts = {};

    // Count the users for each shift
    for (const shift of allShifts) {
      const usersCount = await UserModel.countDocuments({
        shift: shift.shiftName,
      });
      shiftCounts[shift.shiftName] = usersCount;
    }

    // Combine shift data with counts
    const shiftsWithCounts = allShifts.map((shift) => ({
      ...shift.toObject(),
      usersCount: shiftCounts[shift.shiftName] || 0,
    }));

    return NextResponse.json(
      {
        allShifts: shiftsWithCounts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching all shifts:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch all shifts",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchAllShiftsHandler);
