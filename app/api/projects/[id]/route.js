import connectMongoDB from "../../../../lib/mongodb";
import Project from "../../../../models/Projects";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Failed to get project:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
