import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    
    fullName: {
        type: String,
        required: true,
        trim: true,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },

    bed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bed",
        required: true,
    },

    checkInDate: {
        type: Date,
        default: Date.now,
    },

    checkOutDate: {
        type: Date,
        default: null,
    },

    monthlyRent: {
        type: Number,
        required: true,
    },

    securityDeposit: {
        type: Number,
        default: 0,
    },

    emergencyContact: {
        type: String,
        trim: true,
    },

    isActive: {
        type: Boolean,
        default: true,
    },
    },
    {
    timestamps: true,
    }
);

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;