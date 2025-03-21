"use server";

import Razorpay from "razorpay";
import User from "@/models/User";
import Payment from "@/models/Payment";
import { connectDB } from "@/lib/mongodb";

export const initiate = async (amount, to_user, paymentform) => {
    if (!to_user) {
        throw new Error("to_user is required but missing");
    }

    var instance = new Razorpay({ 
        key_id: process.env.key_id, 
        key_secret: process.env.key_secret 
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

export const fetchuser = async (username) => {
    await connectDB();
    let u = await User.findOne({ username: username }).lean();

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
    let payments = await Payment.find({ to_user: username })
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
