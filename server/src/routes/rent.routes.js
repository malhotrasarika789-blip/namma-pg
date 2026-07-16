import express from "express";
import { createRent, getRents, getRentById, updateRent, deleteRent } from "../controllers/rent.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createRentSchema, updateRentSchema } from "../validations/rent.validation.js";

const router = express.Router();

router.post("/",authMiddleware,checkRole("owner"),validate(createRentSchema),createRent);
router.get("/",authMiddleware,checkRole("owner"),getRents);
router.get("/:id",authMiddleware,checkRole("owner"),getRentById);
router.put("/:id",authMiddleware,checkRole("owner"),validate(updateRentSchema),updateRent);
router.delete("/:id",authMiddleware,checkRole("owner"),deleteRent);

export default router;