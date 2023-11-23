import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  teamLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  feedbackText: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const FeedbackModel =
  mongoose.models.feedback || mongoose.model("feedback", feedbackSchema);

export default FeedbackModel;
