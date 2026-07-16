import Joi from "joi";

export const createTenantSchema = Joi.object({
    user: Joi.string().required().messages({
        "string.empty": "User ID is required",
        "any.required": "User ID is required",
    }),

    fullName: Joi.string().min(3).max(100).required().messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 3 characters",
            "string.max": "Full name must not exceed 100 characters",
            "any.required": "Full name is required",
        }),

    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be exactly 10 digits",
            "any.required": "Phone number is required",
        }),

    email: Joi.string().email().messages({
            "string.email": "Please enter a valid email",
        }),

    gender: Joi.string().valid("Male", "Female", "Other").required().messages({
            "any.only": "Gender must be Male, Female or Other",
            "any.required": "Gender is required",
        }),

    bed: Joi.string().required().messages({
            "string.empty": "Bed is required",
            "any.required": "Bed is required",
        }),

    monthlyRent: Joi.number().min(1).required().messages({
            "number.base": "Monthly rent must be a number",
            "number.min": "Monthly rent must be greater than 0",
            "any.required": "Monthly rent is required",
        }),

    securityDeposit: Joi.number().min(0).messages({
            "number.base": "Security deposit must be a number",
            "number.min": "Security deposit cannot be negative",
        }),

    emergencyContact: Joi.string().pattern(/^[0-9]{10}$/).messages({
            "string.pattern.base": "Emergency contact must be exactly 10 digits",
        }),

    checkInDate: Joi.date(),
    checkOutDate: Joi.date(),
    isActive: Joi.boolean(),
});

export const updateTenantSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).messages({
            "string.min": "Full name must be at least 3 characters",
            "string.max": "Full name must not exceed 100 characters",
        }),

    phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
            "string.pattern.base": "Phone number must be exactly 10 digits",
        }),

    email: Joi.string().email().messages({
            "string.email": "Please enter a valid email",
        }),

    gender: Joi.string().valid("Male", "Female", "Other").messages({
            "any.only": "Gender must be Male, Female or Other",
        }),

    bed: Joi.string(),

    monthlyRent: Joi.number().min(1).messages({
            "number.min": "Monthly rent must be greater than 0",
        }),

    securityDeposit: Joi.number().min(0).messages({
            "number.min": "Security deposit cannot be negative",
        }),

    emergencyContact: Joi.string().pattern(/^[0-9]{10}$/).messages({
            "string.pattern.base": "Emergency contact must be exactly 10 digits",
        }),

    checkInDate: Joi.date(),
    checkOutDate: Joi.date(),
    isActive: Joi.boolean(),
});