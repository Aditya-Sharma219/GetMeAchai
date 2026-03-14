import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const leaderboard = await Payment.aggregate([
    { $match: { done: true } },
    {
      $group: {
        _id: "$to_user",
        total: { $sum: "$amount" },
        supporters: { $sum: 1 }
      }
    },
    { $sort: { total: -1 } },
    { $limit: 10 }
  ]);

  const users = await Promise.all(
    leaderboard.map(async (item) => {
      const user = await User.findOne({ username: item._id })
        .select("name username profilepic")
        .lean();

      return {
        name: user?.name,
        username: user?.username,
        profilepic: user?.profilepic,
        total: item.total,
        supporters: item.supporters
      };
    })
  );

  return NextResponse.json(users);
}