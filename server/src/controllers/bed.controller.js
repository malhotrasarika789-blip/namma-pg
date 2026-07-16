import Bed from "../models/bed.model.js";
import Room from "../models/room.model.js";
import Property from "../models/property.models.js";

export const createBed = async (req, res) => {
    try {
        const { room, bedNumber } = req.body;
        const roomData = await Room.findById(room);

        if (!roomData) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        const property = await Property.findById(roomData.property);

        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        const bed = await Bed.create({
            room,
            bedNumber,
        });

        return res.status(201).json({
            message: "Bed created successfully",
            bed,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getBeds = async (req, res) => {
    try {
        const properties = await Property.find({
            owner: req.user.id,
        });

        const propertyIds = properties.map((property) => property._id);

        const rooms = await Room.find({
            property: { $in: propertyIds },
        });

        const roomIds = rooms.map((room) => room._id);

        const beds = await Bed.find({
            room: { $in: roomIds },
        })
            .populate("room")
            .populate("tenant");

        return res.status(200).json({
            message: "Beds fetched successfully",
            beds,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getBedById = async (req, res) => {
    try {
        const { id } = req.params;

        const bed = await Bed.findById(id)
            .populate("room")
            .populate("tenant");

        if (!bed) {
            return res.status(404).json({
                message: "Bed not found",
            });
        }

        const property = await Property.findById(bed.room.property);

        if (!property || property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        return res.status(200).json({
            message: "Bed fetched successfully",
            bed,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const updateBed = async (req, res) => {
    try {
        const { id } = req.params;
        const bed = await Bed.findById(id);

        if (!bed) {
            return res.status(404).json({
                message: "Bed not found",
            });
        }

        const room = await Room.findById(bed.room);
        const property = await Property.findById(room.property);

        if (!property || property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        const updatedBed = await Bed.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            message: "Bed updated successfully",
            bed: updatedBed,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteBed = async (req, res) => {
    try {
        const { id } = req.params;

        const bed = await Bed.findById(id);

        if (!bed) {
            return res.status(404).json({
                message: "Bed not found",
            });
        }

        const room = await Room.findById(bed.room);
        const property = await Property.findById(room.property);

        if (!property || property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        await Bed.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Bed deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};