import express from "express";
import { createTenant, getTenants, getTenantById, updateTenant, deleteTenant, getMyProfile, getTenantDashboard, getMyRoom, getMyRents, getMyComplaints, createComplaint } from "../controllers/tenant.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createTenantSchema, updateTenantSchema } from "../validations/tenant.validation.js";

const router = express.Router();


router.get("/me",authMiddleware,checkRole("tenant"),getMyProfile);
router.get("/dashboard",authMiddleware,checkRole("tenant"),getTenantDashboard);
router.get("/room",authMiddleware,checkRole("tenant"),getMyRoom);
router.get("/rents",authMiddleware,checkRole("tenant"),getMyRents);
router.get("/complaints",authMiddleware,checkRole("tenant"),getMyComplaints);
router.post("/complaints",authMiddleware,checkRole("tenant"),createComplaint);
router.post("/",authMiddleware,checkRole("owner"),validate(createTenantSchema),createTenant);
router.get("/",authMiddleware,checkRole("owner"),getTenants);
router.put("/:id",authMiddleware,checkRole("owner"),validate(updateTenantSchema),updateTenant);
router.delete("/:id",authMiddleware,checkRole("owner"),deleteTenant);
router.get("/:id",authMiddleware,checkRole("owner"),getTenantById);


export default router;