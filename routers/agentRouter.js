import express from "express";

// middlewares
import {
  canAddAgent,
  canAddAgentNote,
  canDelAgent,
  canDelAgentNote,
  canEdtAgent,
} from "../middlewares/agentPermissions.js";

// controllers
import {
  addAgent,
  delAgent,
  edtAgent,
  getAgent,
  addAgentNote,
  delAgentNote,
} from "../controllers/agentController.js";

const router = express.Router();

router.route("/note").post(addAgentNote).delete(delAgentNote);

router.route("/").get(getAgent).post(addAgent).put(edtAgent).delete(delAgent);

export default router;
