import express from "express";
import { createComplaint, getComplaints, getComplaintById, updateComplaint, deleteComplaint } from "../controllers/complaint.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {checkRole} from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createComplaintSchema, updateComplaintSchema } from "../validations/complaint.validation.js";

const router = express.Router();

router.post("/",authMiddleware,checkRole("owner"),validate(createComplaintSchema),createComplaint);
router.get("/",authMiddleware,checkRole("owner"),getComplaints);
router.get("/:id",authMiddleware,checkRole("owner"),getComplaintById);
router.put("/:id",authMiddleware,checkRole("owner"),validate(updateComplaintSchema),updateComplaint);
router.delete("/:id",authMiddleware,checkRole("owner"),deleteComplaint);

export default router;