import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            maxlength: 100,
        },

        address: {
            type: String,
            trim: true,
            required: true,
        },

        city: {
            type: String,
            trim: true,
            required: true,
        },

        state: {
            type: String,
            trim: true,
            required: true,
        },

        pincode: {
            type: String,
            trim: true,
            required: true,
        },

        description: {
            type: String,
            trim: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;