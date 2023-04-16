import express from "express";

// controllers
import { addLead, delLead, edtLead } from "../controllers/leadController.js";

const router = express.Router();

router.route("/").post(addLead).put(edtLead).delete(delLead);

export default router;
