import Property from "../models/property.models.js";
import Room from "../models/room.model.js";

export const createRoom = async (req, res) => {
    try {

    const { propertyId, roomNumber, floor, capacity, rent, } = req.body;
    const property = await Property.findById(propertyId);
    if (!property) {
        return res.status(404).json({
        message: "Property not found",
        });
    }

    if (property.owner.toString() !== req.user.id) {
        return res.status(403).json({
        message: "You are not allowed to add room",
        });
    }

    const room = await Room.create({
        property: propertyId,
        roomNumber,
        floor,
        capacity,
        rent,
    });

    return res.status(201).json({
        message: "Room created successfully",
        room,
    });

    } catch (error) {
    return res.status(500).json({
        message: error.message,
    });
    }
};

export const getRooms = async (req, res) => {
    try {
    const { propertyId } = req.params;
    const property = await Property.findById(propertyId);

    if (!property) {
        return res.status(404).json({
        message: "Property not found",
        });
    }

    if (property.owner.toString() !== req.user.id) {
        return res.status(403).json({
        message: "You are not allowed to view rooms",
        });
    }

    const rooms = await Room.find({
        property: propertyId,
    }).sort({
        createdAt: -1,
    });

    return res.status(200).json({
        message: "Rooms fetched successfully",
        rooms,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getRoomById = async (req, res) => {
  try {

    const { id } = req.params;

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    const property = await Property.findById(room.property);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to view this room",
      });
    }

    return res.status(200).json({
      message: "Room fetched successfully",
      room,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateRoom = async (req, res) => {
  try {

    const { id } = req.params;

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    const property = await Property.findById(room.property);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to update this room",
      });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Room updated successfully",
      room: updatedRoom,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteRoom = async (req, res) => {
  try {

    const { id } = req.params;

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    const property = await Property.findById(room.property);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this room",
      });
    }

    await Room.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Room deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllRooms = async (req, res) => {
  try {

    const properties = await Property.find({
      owner: req.user.id
    }).select("_id");


    const propertyIds = properties.map(
      (property) => property._id
    );


    const rooms = await Room.find({
      property: {
        $in: propertyIds
      }
    }).sort({
      createdAt: -1
    });


    return res.status(200).json({

      message: "All rooms fetched successfully",

      rooms

    });


  } catch (error) {

    return res.status(500).json({

      message: error.message

    });

  }
};