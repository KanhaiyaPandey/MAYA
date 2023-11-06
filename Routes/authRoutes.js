import { Router } from "express";
const router = Router();
import upload from "../middlewares/multerMiddleware.js";
import { register } from "../controllers/authControllers.js";

router.post("/register",upload.single("picture"),register )

export default router;