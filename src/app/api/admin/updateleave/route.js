import { NextResponse } from "next/server";
import LeaveModel from "../../../../../backend/models/Leave";
import connectDb from "../../../../../backend/middleware/db";
import AttendanceModel from "../../../../../backend/models/Attendance";

const updateLeaveStatusHandler = async (req) => {
  try {
    const { id, btnValue } = await req.json();

    // Validate btnValue
    if (btnValue !== "Approved" && btnValue !== "Rejected") {
      return NextResponse.json(
        {
          message:
            "Invalid btnValue. Only 'Approved' or 'Rejected' are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    // Find the leave by id
    const leave = await LeaveModel.findById(id);

    if (!leave) {
      return NextResponse.json(
        {
          message: "Leave not found",
        },
        {
          status: 404,
        }
      );
    }

    // Update the leave status based on the btnValue
    leave.status = btnValue === "Approved" ? "Approved" : "Rejected";
    await leave.save();

    // If the leave is Approved, update the attendance records
    if (btnValue === "Approved") {
      const userId = leave.userId;
      const fromDate = new Date(leave.fromDate);
      const toDate = new Date(leave.toDate);

      // Generate an array of dates from fromDate to toDate
      const missingDates = [];
      let currentDate = new Date(fromDate);
      while (currentDate <= toDate) {
        missingDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      for (const date of missingDates) {
        // Check if an attendance record already exists for the userId and date
        const existingAttendance = await AttendanceModel.findOne({
          userId: userId,
          createdAt: date,
        });

        // If no attendance record exists, create a new one with status "On Leave"
        if (!existingAttendance) {
          await AttendanceModel.create({
            userId: userId,
            createdAt: date,
            status: "On Leave",
          });
        }
      }
    } else if (btnValue === "Rejected") {
      const userId = leave.userId;
      const fromDate = new Date(leave.fromDate);
      const toDate = new Date(leave.toDate);

      // Generate an array of dates from fromDate to toDate
      const missingDates = [];
      let currentDate = new Date(fromDate);
      while (currentDate <= toDate) {
        missingDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      for (const date of missingDates) {
        // Check if an attendance record already exists for the userId and date
        const existingAttendance = await AttendanceModel.findOne({
          userId: userId,
          createdAt: date,
        });

        // If no attendance record exists, create a new one with status "Absent"
        if (!existingAttendance) {
          await AttendanceModel.create({
            userId: userId,
            createdAt: date,
            status: "Absent",
          });
        } else if (existingAttendance.status === "On Leave") {
          // If an attendance record exists with status "On Leave", update it to "Absent"
          existingAttendance.status = "Absent";
          await existingAttendance.save();
        }
      }
    }

    return NextResponse.json(
      {
        message: "Leave status updated successfully",
        updatedLeave: leave,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating leave status:", error);
    return NextResponse.json(
      {
        message: "Failed to update leave status",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(updateLeaveStatusHandler);
