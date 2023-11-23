import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // User image URL or base64 data
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teamLead: { type: Boolean, default: false }, // Whether the user is a team lead or not
  teamLeadEmail: { type: String }, // Email of the team lead (if user is not a team lead)
  department: { type: String }, // Department the user belongs to
  shift: { type: String }, // Shift the user is assigned to
  // Add other fields as needed
});

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;


