"use server";

import Razorpay from "razorpay";
import User from "@/models/User";
import Payment from "@/models/Payment";
import { connectDB } from "@/lib/mongodb";

export const initiate = async (amount, to_user, paymentform) => {
    await connectDB();
    const user = await User.findOne({ username: to_user })
    const razrorpay_keySecret = user.keySecret
    const razorpay_keyId = user.keyId
    if (!to_user) {
        throw new Error("to_user is required but missing");
    }

    var instance = new Razorpay({
        key_id: razorpay_keyId,
        key_secret: razrorpay_keySecret
    });

    let order = await instance.orders.create({
        amount: amount * 100, // Convert amount to paisa (Razorpay uses INR in paisa)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
            name: paymentform.name,
            message: paymentform.message,
        }
    });

    if (!order) {
        throw new Error("Razorpay order creation failed");
    }

    // Store payment details in MongoDB
    await Payment.create({
        amount: amount,
        to_user: to_user,
        oid: order.id,
        name: paymentform.name,
        message: paymentform.message,
        done: false
    });

    return { order_id: order.id };
};
export const getUserRazorpayKey = async (username) => {
    try {
        await connectDB();
        // Check if username is provided
        const user = await User.findOne({username : username}); // Fetch user details from DB
        return user?.keyId || null; // Return keyId or null if not found
    } catch (error) {
        console.error("Error fetching Razorpay key:", error);
        return null;
    }
};

export const fetchuser = async (email) => {
    await connectDB();

    let u = await User.findOne({ email }).lean();

    if (!u) return null;

    return {
        ...u,
        _id: u._id.toString(),
        createdAt: u.createdAt?.toISOString(),
        updatedAt: u.updatedAt?.toISOString()
    };
};

export const fetchpayments = async (username) => {
    await connectDB();
    let payments = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 })
        .lean(); // ✅ Convert to plain objects

    // ✅ Convert MongoDB ObjectIDs to strings
    let formattedPayments = payments.map(payment => ({
        ...payment,
        _id: payment._id.toString(), // Convert ObjectId to string
        createdAt: payment.createdAt.toISOString(), // Convert Date to string
        updatedAt: payment.updatedAt.toISOString()  // Convert Date to string
    }));

    return formattedPayments;
};


export const updateProfile = async (email, data) => {
  await connectDB();

  const user = await User.findOne({ email });

  if (!user) return "User not found";

  // check username uniqueness
  if (data.username && data.username !== user.username) {
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) return "Username already exists";
  }

  const oldUsername = user.username;

  await User.updateOne(
    { email },
    {
      $set: {
        name: data.name,
        username: data.username,
        keyId: data.keyId,
        keySecret: data.keySecret,
        profilepic: data.profilepic ?? user.profilepic,
        coverpic: data.coverpic ?? user.coverpic
      }
    }
  );

  // update username in payments if username changed
  if (data.username && data.username !== oldUsername) {
    await Payment.updateMany(
      { to_user: oldUsername },
      { $set: { to_user: data.username } }
    );
  }

  return "Profile updated successfully";
};
