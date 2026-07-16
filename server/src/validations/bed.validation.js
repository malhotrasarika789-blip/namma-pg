import Joi from "joi";

export const createBedSchema = Joi.object({
    room: Joi.string().required().messages({
            "string.empty": "Room is required",
            "any.required": "Room is required",
        }),

    bedNumber: Joi.string().required().messages({
            "string.empty": "Bed number is required",
            "any.required": "Bed number is required",
        }),

    status: Joi.string().valid("available", "occupied").messages({
            "any.only": "Status must be either available or occupied",
        }),
});

export const updateBedSchema = Joi.object({
    bedNumber: Joi.string().messages({
        "string.base": "Bed number must be a string",
    }),

    status: Joi.string().valid("available", "occupied").messages({
            "any.only": "Status must be either available or occupied",
        }),
});