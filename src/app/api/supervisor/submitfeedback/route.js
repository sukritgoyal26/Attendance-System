import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "../../../../../backend/models/User";
import connectDb from "../../../../../backend/middleware/db";
import FeedbackModel from "../../../../../backend/models/Feedback";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const submitFeedbackHandler = async (request) => {
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

    // Extract user information from the decoded token
    const { userId } = decodedToken;

    // Parse the incoming JSON data
    const { userEmail, feedbackText } = await request.json();

    // Check if the feedback is empty
    if (!feedbackText) {
      return NextResponse.json(
        {
          message: "Feedback text is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Find the user based on the provided email
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

    // Create a new feedback entry
    const newFeedback = new FeedbackModel({
      user: user._id,
      teamLead: userId, // Set the teamLead as the logged-in user
      feedbackText,
    });

    await newFeedback.save();

    return NextResponse.json(
      {
        message: "Feedback submitted successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      {
        message: "Failed to submit feedback.",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(submitFeedbackHandler);
