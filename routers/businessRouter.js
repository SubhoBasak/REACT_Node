import express from "express";

import {
  addBusiness,
  delBusiness,
  edtBusiness,
} from "../controllers/businessController.js";

const router = express.Router();

router.route("/").post(addBusiness).put(edtBusiness).delete(delBusiness);

export default router;
