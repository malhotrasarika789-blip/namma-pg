import Joi from "joi";

export const createComplaintSchema = Joi.object({

    category: Joi.string()
        .valid(
            "Wi-Fi",
            "Water",
            "Electricity",
            "Cleaning",
            "Room Repair",
            "Other"
        )
        .required()
        .messages({
            "any.only": "Invalid complaint category",
            "any.required": "Category is required",
            "string.empty": "Category is required",
        }),


    description: Joi.string()
        .min(5)
        .required()
        .messages({
            "string.min": "Description must be at least 5 characters",
            "any.required": "Description is required",
            "string.empty": "Description is required",
        }),


    status: Joi.string()
        .valid(
            "Open",
            "In Progress",
            "Resolved"
        )
        .default("Open")

});


export const updateComplaintSchema = Joi.object({

    category: Joi.string()
        .valid(
            "Wi-Fi",
            "Water",
            "Electricity",
            "Cleaning",
            "Room Repair",
            "Other"
        ),


    description: Joi.string()
        .min(5),


    status: Joi.string()
        .valid(
            "Open",
            "In Progress",
            "Resolved"
        )

});