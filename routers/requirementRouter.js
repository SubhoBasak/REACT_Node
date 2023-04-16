import express from "express";

// controllers
import {
  addRqmn,
  delRqmn,
  edtRqmn,
  getRqmn,
} from "../controllers/requirementController.js";

const router = express.Router();

router.route("/").get(getRqmn).post(addRqmn).put(edtRqmn).delete(delRqmn);

export default router;
