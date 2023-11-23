
import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import AlertModel from "../../../../../backend/models/Alert";

const fetchAlertsHandler = async () => {
  try {
    // Fetch all alerts from the database
    const alerts = await AlertModel.find();

    return NextResponse.json(
      {
        alerts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch alerts",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchAlertsHandler);
