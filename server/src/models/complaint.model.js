import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true,
        },

        category: {
            type: String,
            enum: [
                "Wi-Fi",
                "Water",
                "Electricity",
                "Cleaning",
                "Room Repair",
                "Other"
            ],
            required: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "Open",
                "In Progress",
                "Resolved"
            ],
            default: "Open",
        },
    },
    {
        timestamps: true,
    }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;