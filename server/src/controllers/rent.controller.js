import Rent from "../models/rent.model.js";
import Tenant from "../models/tenant.model.js";

export const createRent = async (req, res) => {
    try {
        const { tenant, billingMonth, amount, dueDate, paymentStatus, paymentDate} = req.body;
        const existingTenant = await Tenant.findById(tenant);

        if (!existingTenant) {
            return res.status(404).json({
                message: "Tenant not found",
            });
        }

        const rent = await Rent.create({ tenant, billingMonth, amount, dueDate, paymentStatus, paymentDate, });

        return res.status(201).json({
            message: "Rent record created successfully",
            rent,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getRents = async (req, res) => {
    try {
        const rents = await Rent.find()
            .populate("tenant");

        return res.status(200).json({
            message: "Rent records fetched successfully",
            rents,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getRentById = async (req, res) => {
    try {
        const { id } = req.params;
        const rent = await Rent.findById(id)
            .populate("tenant");

        if (!rent) {
            return res.status(404).json({
                message: "Rent record not found",
            });
        }

        return res.status(200).json({
            message: "Rent record fetched successfully",
            rent,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const updateRent = async (req, res) => {
    try {
        const { id } = req.params;
        const rent = await Rent.findById(id);

        if (!rent) {
            return res.status(404).json({
                message: "Rent record not found",
            });
        }

        const updatedRent = await Rent.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );

        return res.status(200).json({
            message: "Rent updated successfully",
            rent: updatedRent,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteRent = async (req, res) => {
    try {
        const { id } = req.params;
        const rent = await Rent.findById(id);

        if (!rent) {
            return res.status(404).json({
                message: "Rent record not found",
            });
        }

        await Rent.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Rent deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};