import express from "express";

// controllers
import {
  addPropertyFolder,
  delProperties,
  edtPropertyFolder,
  getFolderItems,
} from "../controllers/propertyFolderController.js";

const router = express.Router();

router
  .route("/")
  .get(getFolderItems)
  .post(addPropertyFolder)
  .put(edtPropertyFolder)
  .delete(delProperties);

export default router;
