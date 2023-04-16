import express from "express";

// controllers
import {
  getUsers,
  addUser,
  edtUser,
  delUser,
  activateUsers,
  deactivateUsers,
  delUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/opt").post(activateUsers).put(deactivateUsers).delete(delUsers);
router.route("/").get(getUsers).post(addUser).put(edtUser).delete(delUser);

export default router;
