import express from "express";

// controllers
import {
  addProperty,
  delProperty,
  edtProperty,
  getProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router
  .route("/")
  .get(getProperty)
  .post(addProperty)
  .put(edtProperty)
  .delete(delProperty);

export default router;
