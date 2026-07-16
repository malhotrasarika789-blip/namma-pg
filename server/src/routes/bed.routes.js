import express from "express";
import { createBed, getBeds, getBedById, updateBed, deleteBed } from "../controllers/bed.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createBedSchema, updateBedSchema, } from "../validations/bed.validation.js";

const router = express.Router();

router.post("/",authMiddleware,checkRole("owner"),validate(createBedSchema),createBed);
router.get("/",authMiddleware,checkRole("owner"),getBeds);
router.get("/:id",authMiddleware,checkRole("owner"),getBedById);
router.put("/:id",authMiddleware,checkRole("owner"),validate(updateBedSchema),updateBed);
router.delete("/:id",authMiddleware,checkRole("owner"),deleteBed);

export default router;