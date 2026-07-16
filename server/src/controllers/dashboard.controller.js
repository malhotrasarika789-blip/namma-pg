import Property from "../models/property.models.js";
import Room from "../models/room.model.js";
import Bed from "../models/bed.model.js";
import Rent from "../models/rent.model.js";
import Complaint from "../models/complaint.model.js";


export const getDashboardStats = async (req, res) => {
    try {
        const totalProperties = await Property.countDocuments();
        const totalRooms = await Room.countDocuments();
        const totalBeds = await Bed.countDocuments();
        const occupiedBeds = await Bed.countDocuments({
            status: "occupied"
        });

        const vacantBeds = await Bed.countDocuments({
            status: "available"
        });

        const monthlyExpectedRent = await Rent.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        const collectedRent = await Rent.aggregate([
            {
                $match: {
                    paymentStatus: "Paid"
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        const pendingRent = await Rent.aggregate([
            {
                $match: {
                    paymentStatus: {
                        $in: ["Pending", "Overdue"]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        const activeComplaints = await Complaint.countDocuments({
            status: {
                $in: ["Open", "In Progress"]
            }
        });


        return res.status(200).json({
            message: "Dashboard stats fetched successfully",
            stats: {
                totalProperties,
                totalRooms,
                totalBeds,
                occupiedBeds,
                vacantBeds,
                monthlyExpectedRent:
                monthlyExpectedRent[0]?.total || 0,
                collectedRent:
                collectedRent[0]?.total || 0,
                pendingRent:
                pendingRent[0]?.total || 0,
                activeComplaints
            }
        });


    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};