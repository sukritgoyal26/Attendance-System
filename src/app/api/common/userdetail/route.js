import { NextResponse } from "next/server";
import UserModel from "../../../../../backend/models/User";
import AttendanceModel from "../../../../../backend/models/Attendance";
import LeaveModel from "../../../../../backend/models/Leave";
import connectDb from "../../../../../backend/middleware/db";

const singleUserDetail = async (request) => {
  try {
    const { email } = await request.json();

    // Fetch user details based on the email
    const user = await UserModel.findOne(
      { email },
      "firstName lastName email teamLead"
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const userId = user._id;

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

export const POST = connectDb(singleUserDetail);
