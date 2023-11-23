import { NextResponse } from "next/server";

import connectDb from "../../../../../backend/middleware/db";
import ReportModel from "../../../../../backend/models/Report";

const updateAlertStatusHandler = async (req) => {
  try {
    const { id, newStatus } = await req.json();
    console.log("id", id, " new status", newStatus);
    // Validate newStatus (assuming it should be "Resolved" or "Unresolved")
    if (newStatus !== "Resolved" && newStatus !== "Unresolved") {
      return NextResponse.json(
        {
          message:
            "Invalid newStatus. Only 'Resolved' or 'Unresolved' are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    // Find the alert by ID
    const alert = await ReportModel.findById(id);

    if (!alert) {
      return NextResponse.json(
        {
          message: "Alert not found",
        },
        {
          status: 404,
        }
      );
    }

    // Update the alert's status
    alert.status = newStatus;
    await alert.save();

    return NextResponse.json(
      {
        message: "Alert status updated successfully",
        updatedAlert: alert,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating alert status:", error);
    return NextResponse.json(
      {
        message: "Failed to update alert status",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(updateAlertStatusHandler);
