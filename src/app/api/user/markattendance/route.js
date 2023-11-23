
// backend/pages/api/attendance.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import AttendanceModel from "../../../../../backend/models/Attendance";
import connectDb from "../../../../../backend/middleware/db";
import ShiftModel from "../../../../../backend/models/Shift";
import UserModel from "../../../../../backend/models/User";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

// to check date
function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// calculate status
const calculateStatus = (checkoutTime, shiftEndTime) => {
  const checkoutDate = new Date(checkoutTime);
  const shiftEndDate = new Date(shiftEndTime);
  shiftEndDate.setHours(
    shiftEndTime.split(":")[0],
    shiftEndTime.split(":")[1],
    0,
    0
  );

  if (checkoutDate <= shiftEndDate) {
    return "On Time";
  } else {
    return "Late";
  }
};

const attendanceHandler = async (request) => {
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

    // Get the action from the query parameter instead of request body
    const action = await request.json();

    // Find the latest attendance record for the user
    const latestAttendance = await AttendanceModel.findOne({ userId }).sort({
      createdAt: -1,
    });

    // Get the current day of the week
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const currentDay = daysOfWeek[new Date().getDay()];

    // Find the user's shift data for the current day
    const user = await UserModel.findById(userId);
    const userShift = user.shift;
    const shiftData = await ShiftModel.findOne({ shiftName: userShift });
    console.log("my shift is ", shiftData);
    // Perform the action based on the user's current state
    switch (action.action) {
      case "check-in":
        if (latestAttendance && !latestAttendance.checkOut) {
          return NextResponse.json(
            {
              message: "User is already clocked in",
            },
            {
              status: 400,
            }
          );
        } else if (
          latestAttendance &&
          latestAttendance.checkOut &&
          !isSameDate(latestAttendance.checkOut, new Date()) // Add this check
        ) {
          const newCheckInAttendance = new AttendanceModel({
            userId,
            checkIn: new Date(),
            status: "In Progress",
          });

          await newCheckInAttendance.save();

          return NextResponse.json(
            {
              message: "Check-in successful",
              checkIn: newCheckInAttendance.checkIn,
            },
            {
              status: 200,
            }
          );
        } else if (latestAttendance && latestAttendance.checkOut) {
          // If the user has already checked out, prevent them from checking in again
          return NextResponse.json(
            {
              message:
                "User has already checked out. Cannot check in again on the same date.",
            },
            {
              status: 400,
            }
          );
        } else {
          // Create a new attendance record with check-in time
          const newCheckInAttendance = new AttendanceModel({
            userId,
            checkIn: new Date(),
          });

          await newCheckInAttendance.save();

          return NextResponse.json(
            {
              message: "Check-in successful",
              checkIn: newCheckInAttendance.checkIn,
            },
            {
              status: 200,
            }
          );
        }

      case "check-out":
        if (!latestAttendance || latestAttendance.checkOut) {
          return NextResponse.json(
            {
              message: "User is already clocked out",
            },
            {
              status: 400,
            }
          );
        }

        // Update the latest attendance record with check-out time
        latestAttendance.checkOut = new Date();
        // Calculate and update the total time
        if (latestAttendance.checkIn) {
          const totalTimeInSeconds = Math.floor(
            (latestAttendance.checkOut - latestAttendance.checkIn) / 1000
          );
          latestAttendance.totalTime = totalTimeInSeconds;
        }

        // Calculate and update the status based on shift timings and checkout time
        if (
          shiftData &&
          shiftData[currentDay] &&
          !shiftData[currentDay].isOffDay
        ) {
          const checkoutTime = latestAttendance.checkOut;
          const shiftEndTime = shiftData[currentDay].endTime;
          latestAttendance.status = calculateStatus(checkoutTime, shiftEndTime);
        }

        await latestAttendance.save();

        return NextResponse.json(
          {
            message: "Check-out successful",
            checkOut: latestAttendance.checkOut,
            totalTime: latestAttendance.totalTime,
            status: latestAttendance.status,
          },
          {
            status: 200,
          }
        );

      case "break-start":
        // Create a new break-start entry
        if (!latestAttendance || latestAttendance.checkOut) {
          return NextResponse.json(
            {
              message: "User is not clocked in. Cannot start break.",
            },
            {
              status: 400,
            }
          );
        }

        if (
          latestAttendance.breaks &&
          latestAttendance.breaks.length > 0 &&
          !latestAttendance.breaks[latestAttendance.breaks.length - 1]
            .breakEndTime
        ) {
          // If the user has already started a break and not ended it, prevent starting another break
          return NextResponse.json(
            {
              message:
                "Break is already in progress. Cannot start another break without ending the current one.",
            },
            {
              status: 400,
            }
          );
        }

        // Push the new break-start entry using Mongoose array methods
        latestAttendance.breaks.push({
          breakStartTime: new Date(),
          breakEndTime: null,
        });
        await latestAttendance.save();

        return NextResponse.json(
          {
            message: "Break started",
          },
          {
            status: 200,
          }
        );

      case "break-end":
        // Find the latest break-start entry that does not have a break-end time
        const latestBreakStart = latestAttendance.breaks.find(
          (breakEntry) => !breakEntry.breakEndTime
        );

        if (!latestBreakStart) {
          return NextResponse.json(
            {
              message: "No break is in progress",
            },
            {
              status: 400,
            }
          );
        }

        // Update the latest break-start entry with break-end time
        latestBreakStart.breakEndTime = new Date();

        // Calculate the break time in seconds and update the breakTime field
        const breakStartTime = latestBreakStart.breakStartTime.getTime();
        const breakEndTime = latestBreakStart.breakEndTime.getTime();
        const breakTimeInSeconds = Math.floor(
          (breakEndTime - breakStartTime) / 1000
        );
        latestBreakStart.breakTime = breakTimeInSeconds;

        await latestAttendance.save();

        return NextResponse.json(
          {
            message: "Break ended",
            breakStart: latestBreakStart.breakStartTime,
            breakEnd: latestBreakStart.breakEndTime,
          },
          {
            status: 200,
          }
        );
      default:
        return NextResponse.json(
          {
            message: "Invalid action",
          },
          {
            status: 400,
          }
        );
    }
  } catch (error) {
    console.error("Error during attendance action:", error);
    return NextResponse.json(
      {
        message: "Failed to perform attendance action",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(attendanceHandler);
