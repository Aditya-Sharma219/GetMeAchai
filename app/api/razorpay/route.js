"use server"
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import { connectDB } from "@/lib/mongodb";

export const POST = async (req) => {
  try {
    // ✅ Parse Form Data
    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    console.log("📌 Received Payment Data:", body);

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;
    const secret = process.env.KEY_SECRET; // ✅ Keeping the exact env variable name

    // ✅ Check if secret is defined
    if (!secret) {
      throw new Error("Secret key is missing. Check your environment variables.");
    }

    // ✅ Validate Payment Signature
    validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      secret
    );

    console.log("✅ Payment signature verified successfully.");

    // ✅ Connect to MongoDB
    await connectDB();

    // ✅ Ensure order_id is stored as a string for matching
    const orderId = String(razorpay_order_id).trim();

    // ✅ Find Payment Record
    const payment = await Payment.findOne({ oid: orderId });

    if (!payment) {
      console.error("❌ Payment record not found in DB for Order ID:", orderId);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    console.log("✅ Payment found in DB:", payment);

    // ✅ Update Payment Status
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: orderId },
      { $set: { done: true, payment_id: razorpay_payment_id } },
      { new: true }
    );

    if (!updatedPayment) {
      throw new Error("Failed to update payment status.");
    }

    console.log("✅ Payment updated successfully in DB:", updatedPayment);

    // ✅ Redirect to user's success page if available
    if (updatedPayment?.to_user) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/${updatedPayment.to_user}?paymentdone=true`
      );
    } else {
      console.warn("⚠️ No `to_user` found for payment. Skipping redirect.");
      return NextResponse.json({ message: "Payment verified successfully" }, { status: 200 });
    }
  } catch (error) {
    console.error("❌ Error processing payment:", error);
    return NextResponse.json({ error: error.message || "Error verifying payment" }, { status: 500 });
  }
};
