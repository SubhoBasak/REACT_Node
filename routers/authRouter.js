import express from "express";

// controllers
import { loginUser, verifyUser } from "../controllers/authController.js";

const router = express.Router();

router.route("/").post(loginUser).put(verifyUser);

export default router;
