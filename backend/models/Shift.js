import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  shiftName: { type: String, required: true },
  // Define start and end times for each day of the week
  monday: {
    startTime: { type: String },
    endTime: { type: String },
    isOffDay: { type: Boolean, default: false },
    workingHours: { type: Number },
  },
  tuesday: {
    startTime: { type: String },
    endTime: { type: String },
    isOffDay: { type: Boolean, default: false },
    workingHours: { type: Number },
  },
  wednesday: {
    startTime: { type: String },
    endTime: { type: String },
    isOffDay: { type: Boolean, default: false },
    workingHours: { type: Number },
  },
  thursday: {
    startTime: { type: String },
    endTime: { type: String },
    isOffDay: { type: Boolean, default: false },
    workingHours: { type: Number },
  },
  friday: {
    startTime: { type: String },
    endTime: { type: String },
    isOffDay: { type: Boolean, default: false },
    workingHours: { type: Number },
  },
  saturday: {
    startTime: { type: String },
    endTime: { type: String },
    isOffDay: { type: Boolean, default: false },
    workingHours: { type: Number },
  },
  sunday: {
    startTime: { type: String },
    endTime: { type: String },
    isOffDay: { type: Boolean, default: false },
    workingHours: { type: Number },
  },
});

const ShiftModel =
  mongoose.models.Shift || mongoose.model("Shift", shiftSchema);

export default ShiftModel;
