import express from "express";

// middlewares
import {
  canAddClient,
  canAddClientNote,
  canDelClient,
  canDelClientNote,
  canEdtClient,
} from "../middlewares/clientPermissions.js";

// controllers
import {
  addClient,
  delClient,
  edtClient,
  getClient,
  addClientNote,
  delClientNote,
} from "../controllers/clientController.js";

const router = express.Router();

router.route("/note").post(addClientNote).delete(delClientNote);

router
  .route("/")
  .get(getClient)
  .post(addClient)
  .put(edtClient)
  .delete(delClient);

export default router;
