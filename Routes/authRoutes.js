import { Router } from "express";
const router = Router();
import upload from "../middlewares/multerMiddleware.js";
import { register, login } from "../controllers/authControllers.js";
import { authenticateUser } from "../middlewares/authMiddleWare.js";

router.post("/register",upload.single("picture"),register );
router.post("/login", authenticateUser, login)

export default router;