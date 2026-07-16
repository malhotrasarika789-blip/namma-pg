import express from "express";
import { createRoom,getRooms,getRoomById,updateRoom,deleteRoom, } from "../controllers/room.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createRoomSchema,updateRoomSchema, } from "../validations/room.validation.js";

const router = express.Router();

router.post("/",authMiddleware,checkRole("owner"),validate(createRoomSchema),createRoom);
router.get("/property/:propertyId",authMiddleware,checkRole("owner"),getRooms);
router.get("/:id",authMiddleware,checkRole("owner"),getRoomById);
router.put("/:id",authMiddleware,checkRole("owner"),validate(updateRoomSchema),updateRoom);
router.delete("/:id",authMiddleware,checkRole("owner"),deleteRoom);

export default router;