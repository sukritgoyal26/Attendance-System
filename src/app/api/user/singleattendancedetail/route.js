
// backend/pages/api/singleattendancedetail.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import AttendanceModel from "../../../../../backend/models/Attendance";
import connectDb from "../../../../../backend/middleware/db";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const singleAttendanceDetailHandler = async (request) => {
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

    // Get the current date
    const currentDate = new Date().toISOString().split("T")[0]; // Get the date in "YYYY-MM-DD" format

    // Find the attendance record for the user on the current date
    const attendance = await AttendanceModel.findOne({
      userId,
      createdAt: {
        $gte: new Date(currentDate), // Search for attendance records on and after the current date
        $lt: new Date(
          new Date(currentDate).setDate(new Date(currentDate).getDate() + 1)
        ), // Search for attendance records before the next day
      },
    });

    if (!attendance) {
      return NextResponse.json(
        {
          message: "No attendance record found for the current date.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Attendance details retrieved successfully",
        attendance,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error retrieving attendance details:", error);
    return NextResponse.json(
      {
        message: "Failed to retrieve attendance details",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(singleAttendanceDetailHandler);
