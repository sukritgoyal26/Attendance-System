
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDb from "../../../../../backend/middleware/db";
import LeaveModel from "../../../../../backend/models/Leave";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const createLeaveHandler = async (request) => {
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

    // Extract the field values from the request body
    const { leaveType, from_date, to_date, reason } = await request.json();

    console.log("Received data:", {
      userId,
      leaveType,
      from_date,
      to_date,
      reason,
    });

    // Create a new instance of the 'Leave' model and assign the field values
    const newLeave = new LeaveModel({
      userId,
      leaveType,
      fromDate: new Date(from_date),
      toDate: new Date(to_date),
      reason,
    });

    // Save the new Leave request to the database
    const savedLeave = await newLeave.save();

    console.log("new leave request", savedLeave);
    return NextResponse.json(
      {
        savedLeave,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating leave request:", error);
    return NextResponse.json(
      {
        message: "Failed to create leave request",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(createLeaveHandler);
