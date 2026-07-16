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
            required: true,
            trim: true,
        },

        floor: {
            type: String,
            required: true,
        },

        capacity: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;