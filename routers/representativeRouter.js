import express from "express";

// controllers
import {
  addRepresentative,
  edtRepresentative,
  getRepresentatives,
  delRepresentative,
} from "../controllers/representativeController.js";

const router = express.Router();

router
  .route("/")
  .get(getRepresentatives)
  .post(addRepresentative)
  .put(edtRepresentative)
  .delete(delRepresentative);

export default router;
