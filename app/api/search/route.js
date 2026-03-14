import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const users = await User.find({
    username: { $regex: query, $options: "i" },
  })
    .select("username name profilepic")
    .limit(5);

  return NextResponse.json(users);
}