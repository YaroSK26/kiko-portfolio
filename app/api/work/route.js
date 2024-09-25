import connectMongoDB from "../../../lib/mongodb";
import Work from "../../../models/Work";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { icon, title, description } = await request.json();
    await connectMongoDB();
    const newWork = await Work.create({ icon, title, description });
    return NextResponse.json(
      { message: "Work Created", _id: newWork._id },
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
    const works = await Work.find();
    return NextResponse.json({ works });
  } catch (error) {
    console.error("Failed to get works:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, icon, title, description } = await request.json();
    await connectMongoDB();
    await Work.findByIdAndUpdate(id, { icon, title, description });
    return NextResponse.json({ message: "Work updated" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update work:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Work.findByIdAndDelete(id);
  return NextResponse.json({ message: "Work deleted" }, { status: 200 });
}
