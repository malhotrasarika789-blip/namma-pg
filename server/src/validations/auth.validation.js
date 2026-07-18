import Joi from "joi";

export const registerSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).trim().required().messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 3 characters",
            "string.max": "Full name must not exceed 100 characters",
            "any.required": "Full name is required",
        }),

    email: Joi.string().email().trim().lowercase().required().messages({
            "string.email": "Please enter a valid email",
            "string.empty": "Email is required",
            "any.required": "Email is required",
        }),

    password: Joi.string().min(6).max(20).required().messages({
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password must not exceed 20 characters",
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),

    role: Joi.string().valid("user", "owner", "tenant", "admin").default("user").messages({
            "any.only": "Invalid role",
        }),
    });

export const loginSchema = Joi.object({
    email: Joi.string().email().trim().lowercase().required().messages({
            "string.email": "Please enter a valid email",
            "string.empty": "Email is required",
            "any.required": "Email is required",
        }),

    password: Joi.string().required().messages({
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),
});