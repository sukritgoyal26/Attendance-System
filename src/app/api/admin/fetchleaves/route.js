

import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import LeaveModel from "../../../../../backend/models/Leave";
import UserModel from "../../../../../backend/models/User";

const viewAllLeavesHandler = async () => {
  try {
    // Find all leaves and populate the userId field with user's first name and last name
    const allLeaves = await LeaveModel.find().populate({
      path: "userId",
      select: "firstName lastName",
    });

    // Extract user names from populated data
    const leavesWithUserNames = allLeaves.map((leave) => ({
      ...leave.toObject(),
      userName: leave.userId
        ? `${leave.userId.firstName} ${leave.userId.lastName}`
        : "Unknown User",
    }));

    return NextResponse.json(
      {
        allLeaves: leavesWithUserNames,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching all leaves:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch all leaves",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(viewAllLeavesHandler);



