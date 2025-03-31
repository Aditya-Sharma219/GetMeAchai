import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function Page({ params }) {
  
  await connectDB(); // Ensure DB connection
  //if the username is not available in db show 404 page
  
  const { username } = await params; // No need to await here; params is already resolved
  const dbuser = await User.findOne({username: username}); // Fetch user details from DB
  if (!dbuser) {
      notFound(); // If user not found, show 404 page
  }

  return (
      <>
          <PaymentPage username={username} />
      </>
  );
}
