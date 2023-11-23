// backend/models/Attendance.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    checkIn: { type: Date },
    checkOut: { type: Date },
    status: { type: String },
    breaks: [
      {
        breakStartTime: { type: Date },
        breakEndTime: { type: Date },
        breakTime: { type: Number, default: 0 }, // Total break time in seconds
      },
    ],
    totalTime: { type: Number, default: 0 }, // Total working time in seconds
  },
  { timestamps: true }
);

const AttendanceModel =
  mongoose.models.attendance || mongoose.model("attendance", attendanceSchema);

export default AttendanceModel;
