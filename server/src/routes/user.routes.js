import express from "express";
import { loginUser, registerUser, getUsers } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema, } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/register",validate(registerSchema),registerUser);
router.post("/login",validate(loginSchema),loginUser);

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Protected route accessed",
        user: req.user
    });
});
router.get("/",authMiddleware, checkRole("owner"), getUsers);
router.get("/owner-test",authMiddleware,checkRole("owner"),(req, res) => {
        res.status(200).json({
            message: "Owner route accessed"
        });
    }
);

export default router;