import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const creators = await User.find({})
      .select("name username profilepic")
      .limit(50)
      .lean();

    const formatted = creators.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching creators:", error);
    return NextResponse.json([]);
  }
}