import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;