"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";

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
