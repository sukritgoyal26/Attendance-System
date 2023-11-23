// Import required modules
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDb from "../../../../../backend/middleware/db";
import LeaveModel from "../../../../../backend/models/Leave";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const viewLeavesHandler = async (request) => {
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

    // Find leaves marked by the specific user
    const userLeaves = await LeaveModel.find({ userId });

    return NextResponse.json(
      {
        userLeaves,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching user leaves:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch user leaves",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(viewLeavesHandler);
