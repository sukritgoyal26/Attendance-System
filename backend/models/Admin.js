import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  // User image URL or base64 data
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true },
});

const AdminModel =
  mongoose.models.admins || mongoose.model("admins", adminSchema);

export default AdminModel;
