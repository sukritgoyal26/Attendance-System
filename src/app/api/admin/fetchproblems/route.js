

import { NextResponse } from "next/server";
import ReportModel from "../../../../../backend/models/Report";
import connectDb from "../../../../../backend/middleware/db";

const fetchAllReportsHandler = async () => {
  try {
    // Fetch all reports (without any specific user filter)
    const reports = await ReportModel.find().sort({ createdAt: -1 });

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

export const GET = connectDb(fetchAllReportsHandler);
