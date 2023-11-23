// backend/pages/api/teamleads.js

import { NextResponse } from "next/server";
import UserModel from "../../../../../backend/models/User";
import connectDb from "../../../../../backend/middleware/db";

const fetchAllTeamLeadsHandler = async () => {
  try {
    // Find all users who are team leads
    const allTeamLeads = await UserModel.find({ teamLead: true });

    return NextResponse.json(
      {
        allTeamLeads,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching all team leads:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch all team leads",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchAllTeamLeadsHandler);
