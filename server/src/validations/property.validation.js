import Joi from "joi";

export const createPropertySchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
            "string.empty": "Property name is required",
            "string.min": "Property name must be at least 3 characters",
            "string.max": "Property name must not exceed 100 characters",
            "any.required": "Property name is required",
        }),

    address: Joi.string().required().messages({
            "string.empty": "Address is required",
            "any.required": "Address is required",
        }),

    city: Joi.string().required().messages({
            "string.empty": "City is required",
            "any.required": "City is required",
        }),

    state: Joi.string().required().messages({
            "string.empty": "State is required",
            "any.required": "State is required",
        }),

    pincode: Joi.string().pattern(/^[0-9]{6}$/).required().messages({
            "string.empty": "Pincode is required",
            "string.pattern.base": "Pincode must be exactly 6 digits",
            "any.required": "Pincode is required",
        }),

    description: Joi.string().max(500).allow("").messages({
            "string.max": "Description must not exceed 500 characters",
        }),
});

export const updatePropertySchema = Joi.object({
    name: Joi.string().min(3).max(100).messages({
            "string.min": "Property name must be at least 3 characters",
            "string.max": "Property name must not exceed 100 characters",
        }),

    address: Joi.string().messages({
        "string.base": "Address must be a string",
    }),

    city: Joi.string().messages({
        "string.base": "City must be a string",
    }),

    state: Joi.string().messages({
        "string.base": "State must be a string",
    }),

    pincode: Joi.string().pattern(/^[0-9]{6}$/).messages({
            "string.pattern.base": "Pincode must be exactly 6 digits",
        }),

    description: Joi.string().max(500).allow("").messages({
            "string.max": "Description must not exceed 500 characters",
        }),
});