"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white p-6">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to Your Dashboard</h1>

      {session?.user && (
        <div className="bg-gray-800 flex flex-col justify-center items-center gap-4 p-6 rounded-lg shadow-lg text-center max-w-md w-full">
          {/* User Avatar */}
          <img
            src={session.user.image || "/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />

          {/* User Details */}
          <h2 className="text-2xl font-semibold text-white">{session.user.name}</h2>
          <p className="text-gray-300">{session.user.email}</p>

          {/* Razorpay Key Inputs */}
          <div className="w-full space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">Key ID</label>
              <input
                type="password"
                placeholder="Enter Razorpay Key ID"
                className="p-2 rounded-md bg-gray-700 text-white w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">Key Secret</label>
              <input
                type="password"
                placeholder="Enter Razorpay Key Secret"
                className="p-2 rounded-md bg-gray-700 text-white w-full focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
