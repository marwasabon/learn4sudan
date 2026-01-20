import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  capacity: { type: Number },
  image_url: { type: String },
  status: {
    type: String,
    enum: ["draft", "open", "closed", "in_progress", "completed", "archived"],
    default: "draft",
  },
  application_open_at: { type: Date },
  application_close_at: { type: Date },
  start_date: { type: Date },
  end_date: { type: Date },
  courses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      is_required: { type: Boolean, default: false },
      sequence_no: { type: Number },
    },
  ],
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Program", ProgramSchema);
