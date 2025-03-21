import mongoose from "mongoose";


const PaymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    to_user: { // Ensure this matches exactly with `to_user`
        type: String,
        required: true
    },
    oid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    message: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
