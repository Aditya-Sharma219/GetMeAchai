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

export const fetchuser = async (username) => {
    await connectDB();
    let u = await User.findOne({ name: username }).lean();

    if (!u) return null;

    return {
        ...u,
        _id: u._id.toString(),
        createdAt: u.createdAt.toISOString(),
        updatedAt: u.updatedAt.toISOString()
    };
};


export const fetchpayments = async (username) => {
    await connectDB();
    let payments = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 })
        .limit(7)
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


export const updateProfile = async (oldusername, data) => {
    await connectDB();

    let ndata = { ...data };

    // Fetch the user using old username
    let user = await User.findOne({ name: oldusername });

    if (!user) return "User not found";

    // If username is changed, check if the new one already exists
    if (ndata.username && oldusername !== ndata.username) {
        let existingUser = await User.findOne({ username: ndata.username });
        if (existingUser) return "Username already exists";
    }

    // Ensure email is included
    ndata.email = user.email;

    // Update the profile in the User model
    await User.updateOne({ email: user.email }, { $set: ndata });

    // Update the username in Payment records where the old username exists
    if (ndata.username && oldusername !== ndata.username) {
        await Payment.updateMany(
            { username: oldusername }, // Find payments linked to the old username
            { $set: { username: ndata.username } } // Update the username to the new one
        );
    }

    return "Profile updated successfully";
};
