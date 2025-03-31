"use server";
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export const POST = async (req) => {
  try {
    await connectDB();

    // ✅ Parse Form Data
    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    console.log("📌 Received Payment Data:", body);

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    // ✅ Ensure we have the order_id
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error("Missing required payment data.");
    }

    // ✅ Find Payment Record by order ID
    const payment = await Payment.findOne({ oid: razorpay_order_id });

    if (!payment) {
      console.error("❌ Payment record not found in DB for Order ID:", razorpay_order_id);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    console.log("✅ Payment found in DB:", payment);

    // ✅ Extract `to_user` from the payment record
    const to_user = payment.to_user;

    if (!to_user) {
      throw new Error("No `to_user` found in payment record.");
    }

    // ✅ Extracting the Razorpay secret of the user
    const user = await User.findOne({ username: to_user });
    if (!user) {
      throw new Error("User not found.");
    }

    const secret = user.keySecret;
    if (!secret) {
      throw new Error("Secret key is missing for this user.");
    }

    // ✅ Validate Payment Signature
    try {
      validatePaymentVerification(
        { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
        razorpay_signature,
        secret
      );
    } catch {
      throw new Error("Payment signature verification failed.");
    }

    console.log("✅ Payment signature verified successfully.");

    // ✅ Update Payment Status
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: razorpay_order_id },
      { $set: { done: true, payment_id: razorpay_payment_id } },
      { new: true }
    );

    if (!updatedPayment) {
      throw new Error("Failed to update payment status.");
    }

    console.log("✅ Payment updated successfully in DB:", updatedPayment);

    // ✅ Redirect to user's success page if available
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/${to_user}?paymentdone=true`
    );
  } catch (error) {
    console.error("❌ Error processing payment:", error);
    return NextResponse.json({ error: error.message || "Error verifying payment" }, { status: 500 });
  }
};
