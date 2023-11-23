import mongoose from "mongoose";
const { Schema } = mongoose;

const reportSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    status: { type: String, default: "Unresolved" },
    message: { type: String },

    // Add other fields as needed
  },
  { timestamps: true }
);

const ReportModel =
  mongoose.models.reports || mongoose.model("reports", reportSchema);

export default ReportModel;
