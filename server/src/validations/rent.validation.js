import Joi from "joi";

export const createRentSchema = Joi.object({

    tenant: Joi.string().required().messages({
            "string.empty": "Tenant is required",
            "any.required": "Tenant is required",
        }),

    billingMonth: Joi.string().required().messages({
            "string.empty": "Billing month is required",
            "any.required": "Billing month is required",
        }),

    amount: Joi.number().min(1).required().messages({
            "number.base": "Amount must be a number",
            "number.min": "Amount must be greater than 0",
            "any.required": "Amount is required",
        }),

    dueDate: Joi.date().required().messages({
            "date.base": "Due date must be a valid date",
            "any.required": "Due date is required",
        }),

    paymentStatus: Joi.string().valid("Paid", "Pending", "Overdue").messages({
            "any.only": "Payment status must be Paid, Pending or Overdue",
        }),
    paymentDate: Joi.date()
        .allow(null),

});


export const updateRentSchema = Joi.object({
    billingMonth: Joi.string(),

    amount: Joi.number().min(1).messages({
            "number.min": "Amount must be greater than 0",
        }),
    dueDate: Joi.date(),

    paymentStatus: Joi.string().valid("Paid", "Pending", "Overdue").messages({
            "any.only": "Payment status must be Paid, Pending or Overdue",
        }),

    paymentDate: Joi.date().allow(null),

});