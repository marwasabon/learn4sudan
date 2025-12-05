import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_description: { type: String },
  url: { type: String },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "mixed"],
  },
  language: { type: String },
  hours: { type: Number },
  rating: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Course", CourseSchema);
