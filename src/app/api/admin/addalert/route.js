

import { NextResponse } from "next/server";
import AlertModel from "../../../../../backend/models/Alert";
import connectDb from "../../../../../backend/middleware/db";

const addAlertHandler = async (request) => {
  try {
    // Extract the field values from the request body
    const { title, message, status } = await request.json();

    console.log("Received data:", { title, message, status });

    // Create a new instance of the 'Alert' model and assign the field values
    const newAlert = new AlertModel({
      title,
      message,
      status,
    });

    // Save the new Alert to the database
    const savedAlert = await newAlert.save();

    console.log("new alert", savedAlert);
    return NextResponse.json(
      {
        savedAlert,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving Alert:", error);
    return NextResponse.json(
      {
        message: "Failed to add alert",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(addAlertHandler);
