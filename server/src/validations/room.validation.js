import Joi from "joi";

export const createRoomSchema = Joi.object({
    propertyId: Joi.string().required().messages({
            "string.empty": "Property ID is required",
            "any.required": "Property ID is required",
        }),

    roomNumber: Joi.string().required().messages({
            "string.empty": "Room number is required",
            "any.required": "Room number is required",
        }),

    floor: Joi.string().required().messages({
            "string.empty": "Floor is required",
            "any.required": "Floor is required",
        }),

    capacity: Joi.number().min(1).required().messages({
            "number.base": "Capacity must be a number",
            "number.min": "Capacity must be at least 1",
            "any.required": "Capacity is required",
        }),
});

export const updateRoomSchema = Joi.object({
    roomNumber: Joi.string().messages({
        "string.base": "Room number must be a string",
    }),

    floor: Joi.string().messages({
        "string.base": "Floor must be a string",
    }),

    capacity: Joi.number().min(1).messages({
            "number.base": "Capacity must be a number",
            "number.min": "Capacity must be at least 1",
        }),
});