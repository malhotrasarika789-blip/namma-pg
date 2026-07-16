import express from "express";
import { createProperty, getMyProperties, getPropertyById, updateProperty,deleteProperty } from "../controllers/property.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createPropertySchema, updatePropertySchema, } from "../validations/property.validation.js";

const router = express.Router();

router.post("/create", authMiddleware, checkRole("owner"), validate(createPropertySchema), createProperty);
router.get("/my-properties", authMiddleware, checkRole("owner"), getMyProperties);
router.get("/:id", authMiddleware, checkRole("owner"), getPropertyById);
router.put("/:id", authMiddleware, checkRole("owner"), validate(updatePropertySchema), updateProperty);
router.delete("/:id", authMiddleware, deleteProperty);



export default router;