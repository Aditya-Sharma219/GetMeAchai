import PaymentPage from "@/components/PaymentPage";
import { notFound, redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function Page({ params }) {

  await connectDB();

  const { username } = await params; // ✅ FIX

  const normalizedUsername = username.toLowerCase();

  // redirect uppercase → lowercase
  if (username !== normalizedUsername) {
    redirect(`/${normalizedUsername}`);
  }

  const dbuser = await User.findOne({
    username: normalizedUsername
  });

  if (!dbuser) {
    notFound();
  }

  return (
    <PaymentPage username={normalizedUsername} />
  );
}