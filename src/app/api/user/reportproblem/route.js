
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ReportModel from "../../../../../backend/models/Report";
import connectDb from "../../../../../backend/middleware/db";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const reportProblemHandler = async (request) => {
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
    const { message } = await request.json();

    console.log("Received report data:", {
      userId,
      message,
    });

    // Create a new instance of the 'Report' model and assign the field values
    const newReport = new ReportModel({
      userId,
      message,
    });

    // Save the new problem report to the database
    const savedReport = await newReport.save();

    console.log("new problem report", savedReport);
    return NextResponse.json(
      {
        savedReport,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error reporting problem:", error);
    return NextResponse.json(
      {
        message: "Failed to report problem",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(reportProblemHandler);
