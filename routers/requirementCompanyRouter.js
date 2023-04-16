import express from "express";

// controllers
import {
  addRqmn,
  delRqmn,
  edtRqmn,
  getRqmn,
} from "../controllers/requirementCompanyController.js";

const router = express.Router();

router.route("/").get(getRqmn).post(addRqmn).put(edtRqmn).delete(delRqmn);

export default router;
