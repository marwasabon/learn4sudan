import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true,
  },
  school: { type: String },
  reason: { type: String },
  date_of_birth: { type: String },
  national_id_number: { type: String },
  status: {
    type: String,
    enum: [
      "draft",
      "submitted",
      "under_review",
      "accepted",
      "rejected",
      "waitlisted",
      "withdrawn",
    ],
    default: "draft",
  },
  applied_at: { type: Date, default: Date.now },
  national_id_file: { type: String },
});

// Unique application per user per program
ApplicationSchema.index({ user: 1, program: 1 }, { unique: true });

export default mongoose.model("Application", ApplicationSchema);
