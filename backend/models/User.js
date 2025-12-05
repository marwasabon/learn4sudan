import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  status: {
    type: String,
    enum: ["active", "inactive", "blocked"],
    default: "active",
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Auto-update updated_at
UserSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.model("User", UserSchema);
