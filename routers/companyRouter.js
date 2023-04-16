import express from "express";

// middlewares
import {
  canAddCompany,
  canAddCompanyNote,
  canDelCompany,
  canDelCompanyNote,
  canEdtCompany,
} from "../middlewares/companyPermissions.js";

// controllers
import {
  addCompany,
  delCompany,
  edtCompany,
  getCompany,
  addCompanyNote,
  delCompanyNote,
} from "../controllers/companyController.js";

const router = express.Router();

router.route("/note").post(addCompanyNote).delete(delCompanyNote);

router
  .route("/")
  .get(getCompany)
  .post(addCompany)
  .put(edtCompany)
  .delete(delCompany);

export default router;
