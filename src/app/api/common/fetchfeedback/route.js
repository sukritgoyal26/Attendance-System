import { NextResponse } from "next/server";
import UserModel from "../../../../../backend/models/User";
import connectDb from "../../../../../backend/middleware/db";
import FeedbackModel from "../../../../../backend/models/Feedback";
require("dotenv").config();

const fetchUserFeedbackHandler = async (request) => {
  try {
    // Parse the incoming JSON data
    const { userEmail } = await request.json();

    // Fetch the user based on the provided email
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Fetch feedbacks for the specified user
    const feedbacks = await FeedbackModel.find({
      user: user._id,
    });

    return NextResponse.json(
      {
        feedbacks,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching user feedbacks:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch user feedbacks.",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(fetchUserFeedbackHandler);
