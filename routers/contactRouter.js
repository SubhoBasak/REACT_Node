import express from "express";

// controllers
import {
  delContacts,
  getAllContacts,
} from "../controllers/contactController.js";

const router = express.Router();

router.route("/").get(getAllContacts).delete(delContacts);

export default router;
