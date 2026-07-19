import express from "express";
import { createTenant, getTenants, getTenantById, updateTenant, deleteTenant, getMyProfile, getTenantDashboard, getMyRoom, getMyRents, getMyComplaints, createComplaint, getMyComplaintById} from "../controllers/tenant.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {createTenantSchema,updateTenantSchema} from "../validations/tenant.validation.js";

const router = express.Router();
router.get("/me",authMiddleware,checkRole("tenant", "user"),getMyProfile);
router.get("/dashboard", authMiddleware,checkRole("tenant", "user"), getTenantDashboard);
router.get("/room",authMiddleware,checkRole("tenant", "user"),getMyRoom);
router.get("/rents",authMiddleware,checkRole("tenant", "user"),getMyRents);
router.get("/complaints",authMiddleware,checkRole("tenant", "user"),getMyComplaints);
router.get("/complaints/:id",authMiddleware,checkRole("tenant", "user"),getMyComplaintById);
router.post("/complaints",authMiddleware,checkRole("tenant", "user"),createComplaint);
router.post("/",authMiddleware,checkRole("owner"),validate(createTenantSchema),createTenant);
router.get("/",authMiddleware,checkRole("owner"),getTenants);
router.get("/:id",authMiddleware,checkRole("owner"),getTenantById);
router.put("/:id",authMiddleware,checkRole("owner"),validate(updateTenantSchema),updateTenant);
router.delete("/:id",authMiddleware,checkRole("owner"),deleteTenant);

export default router;