import Property from "../models/property.models.js";
import User from "../models/user.model.js";

export const createProperty = async (req, res) => {
    try {
        const { name, address, city, state, pincode, description } = req.body;
        const owner = req.user.id;
            const property = await Property.create({
                name,
                address,
                city,
                state,
                pincode,
                description,
                owner
            })
            return res.status(201).json({
                message: "Property created successfully",
                property
});

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getMyProperties = async (req, res) => {
    try {
        const properties = await Property.find({
            owner: req.user.id
        });

        return res.status(200).json({
            message: "Properties fetched successfully",
            properties
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findOne({
        _id: id,
        owner: req.user.id,
});

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        return res.status(200).json({
            message: "Property fetched successfully",
            property
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updateProperty = async (req, res) => {
    try {
        const {id} = req.params
        const { name, address, city, state, pincode, description } = req.body;
        const property = await Property.findById(id);

        if(!property) {
            return res.status(404).json({
                message: "Property not found"
            })
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to update this property"
            });
        }
            const updatedProperty = await Property.findByIdAndUpdate(id,
            {
                name,
                address,
                city,
                state,
                pincode,
                description
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Property Updates successfully"
        })

    }catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to delete this property"
            });
        }
        await Property.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Property deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};