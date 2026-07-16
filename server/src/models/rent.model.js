import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
    {
        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true,
        },

        billingMonth: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        dueDate: {
            type: Date,
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Paid", "Pending", "Overdue"],
            default: "Pending",
        },

        paymentDate: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Rent = mongoose.model("Rent", rentSchema);

export default Rent;