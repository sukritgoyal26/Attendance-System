import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "../../../../../backend/models/User";
import AttendanceModel from "../../../../../backend/models/Attendance";
import connectDb from "../../../../../backend/middleware/db";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const fetchUsersHandler = async (request) => {
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

    // Extract user information from the decoded token
    const { userId, teamLead } = decodedToken;

    if (!teamLead) {
      return NextResponse.json(
        {
          message: "Access denied. You are not a team lead.",
        },
        {
          status: 403,
        }
      );
    }

    // Fetch the user details of the team lead
    const teamLeadUser = await UserModel.findById(userId);

    if (!teamLeadUser) {
      return NextResponse.json(
        {
          message: "Team lead not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Fetch users under the same team lead
    const usersUnderTeamLead = await UserModel.find({
      teamLeadEmail: teamLeadUser.email,
    });

    // Fetch attendance details for the users under the team lead
    const userIDs = usersUnderTeamLead.map((user) => user._id);
    const attendanceDetails = await AttendanceModel.find({
      userId: { $in: userIDs },
    });

    // Combine user details and attendance details
    const usersWithAttendance = usersUnderTeamLead.map((user) => {
      const userAttendance = attendanceDetails.filter(
        (attendance) => attendance.userId.toString() === user._id.toString()
      );
      return {
        ...user.toObject(),
        attendance: userAttendance,
      };
    });

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
        message: "Failed to fetch users and attendance details",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchUsersHandler);
