
// backend/pages/api/userdetails.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "../../../../../backend/models/User";
import AttendanceModel from "../../../../../backend/models/Attendance";
import LeaveModel from "../../../../../backend/models/Leave";
import connectDb from "../../../../../backend/middleware/db";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const userDetailsHandler = async (request) => {
  try {
    // Obtain the token from the request headers
    const token = request.headers.get("Authorization");
    if (!token) {
      return NextResponse.json(
        {
          message: "Authentication failed. Token not provided.",
        },
        {
          status: 401,
        }
      );
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid token.",
        },
        {
          status: 401,
        }
      );
    }

    // Extract the userId from the decoded token
    const { userId } = decodedToken;

    // Fetch user details
    const user = await UserModel.findById(
      userId,
      "firstName lastName email teamLead"
    );

    // Calculate attendance statistics
    const attendanceCount = await AttendanceModel.countDocuments({ userId });
    const totalCheckouts = await AttendanceModel.countDocuments({
      userId,
      checkOut: { $exists: true },
    });
    const totalPendingLeaves = await LeaveModel.countDocuments({
      userId,
      status: "Pending",
    });
    const totalApprovedLeaves = await LeaveModel.countDocuments({
      userId,
      status: "Approved",
    });
    const totalRejectedLeaves = await LeaveModel.countDocuments({
      userId,
      status: "Rejected",
    });

    // Fetch attendance history
    const attendanceHistory = await AttendanceModel.find({ userId });

    return NextResponse.json(
      {
        message: "User details retrieved successfully",
        user,
        attendanceCount,
        totalCheckouts,
        totalApprovedLeaves,
        totalPendingLeaves,
        totalRejectedLeaves,
        attendanceHistory,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return NextResponse.json(
      {
        message: "Failed to retrieve user details",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(userDetailsHandler);
