import express from "express";

// controllers
import { edtStage } from "../controllers/stageController.js";

const router = express.Router();

router.route("/").put(edtStage);

export default router;
