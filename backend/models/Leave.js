import mongoose from "mongoose";
const { Schema } = mongoose;

const leaveSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    leaveType: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, default: "Pending" },

    // Add other fields as needed
  },
  { timestamps: true }
);

const LeaveModel =
  mongoose.models.leaves || mongoose.model("leaves", leaveSchema);

export default LeaveModel;
