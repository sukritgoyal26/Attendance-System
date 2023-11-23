
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ReportModel from "../../../../../backend/models/Report";
import connectDb from "../../../../../backend/middleware/db";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const fetchReportsHandler = async (request) => {
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

    // Fetch reports submitted by the specific employee
    const reports = await ReportModel.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        reports,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch reports",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchReportsHandler);
