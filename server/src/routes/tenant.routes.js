import express from "express";
import { createTenant, getTenants, getTenantById, updateTenant, deleteTenant, getMyProfile } from "../controllers/tenant.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createTenantSchema,updateTenantSchema } from "../validations/tenant.validation.js";


const router = express.Router();

router.post("/", authMiddleware, checkRole("owner"), validate(createTenantSchema), createTenant);
router.get("/", authMiddleware, checkRole("owner"), getTenants);
router.get("/me", authMiddleware, checkRole("tenant"), getMyProfile);
router.get("/:id", authMiddleware, checkRole("owner"), getTenantById);
router.put("/:id", authMiddleware, checkRole("owner"), validate(updateTenantSchema), updateTenant);
router.delete("/:id", authMiddleware, checkRole("owner"), deleteTenant);

export default router;