import connectMongoDB from "../../../../lib/mongodb";
import Work from "../../../../models/Work";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const work = await Work.findById(id);

    if (!work) {
      return NextResponse.json({ message: "Work not found" }, { status: 404 });
    }

    return NextResponse.json({ work });
  } catch (error) {
    console.error("Failed to get work:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
