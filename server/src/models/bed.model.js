import mongoose from "mongoose";

const bedSchema = new mongoose.Schema(
    {
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },

    bedNumber: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ["available", "occupied"],
        default: "available",
    },

    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        default: null,
    },
    },
    {
    timestamps: true,
    }
);

const Bed = mongoose.model("Bed", bedSchema);

export default Bed;