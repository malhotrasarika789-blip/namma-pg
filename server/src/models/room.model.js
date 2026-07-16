import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },

    roomNumber: {
        type: String,
        trim: true,
        required: true,
    },

    floor: {
        type: String,
        trim: true,
        required: true,
    },

    capacity: {
        type: Number,
        required: true,
        min: 1,
    },

    occupiedBeds: {
        type: Number,
        default: 0,
    },

    rent: {
        type: Number,
        required: true,
        min: 0,
    },

    status: {
        type: String,
        enum: ["available", "full", "maintenance"],
        default: "available",
    },
    },
    {
    timestamps: true,
    }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;