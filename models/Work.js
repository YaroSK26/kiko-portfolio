import mongoose, { Schema } from "mongoose";

const WorkSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Work = mongoose.models.Work || mongoose.model("Work", WorkSchema);

export default Work;
