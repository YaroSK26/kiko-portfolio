import connectMongoDB from "../../../lib/mongodb";
import Project from "../../../models/Projects";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    await connectMongoDB();
    const newProject = await Project.create({ title, description });
    return NextResponse.json(
      { message: "Project Created", _id: newProject._id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectMongoDB();
    const projects = await Project.find();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Failed to get projects:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, title, description } = await request.json();
    await connectMongoDB();
    await Project.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: "Project updated" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ message: "Project deleted" }, { status: 200 });
}
