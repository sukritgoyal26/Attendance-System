// pages/api/fetchUsers.js
import { NextResponse } from "next/server";
import UserModel from "../../../../../backend/models/User";
import AttendanceModel from "../../../../../backend/models/Attendance";
import connectDb from "../../../../../backend/middleware/db";

const fetchUsersHandler = async () => {
  try {
    // Get the current date in ISO string format (YYYY-MM-DD)
    const currentDate = new Date().toISOString().split("T")[0];

    // Fetch users with their attendance information for the current date
    const usersWithAttendance = await UserModel.aggregate([
      {
        $lookup: {
          from: AttendanceModel.collection.name,
          let: { userId: "$_id", currentDate },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$userId"] },
                    {
                      $eq: [
                        { $substr: ["$createdAt", 0, 10] },
                        "$$currentDate",
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "attendance",
        },
      },
    ]);

    return NextResponse.json(
      {
        users: usersWithAttendance,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchUsersHandler);
