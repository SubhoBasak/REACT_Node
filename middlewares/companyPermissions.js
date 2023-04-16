import { COMPANY_PERMISSION } from "../constants.js";

export function canAddCompany(req, res, next) {
  try {
    if (
      (req.user.company_permission && COMPANY_PERMISSION.ADD_COMPANY) ===
      COMPANY_PERMISSION.ADD_COMPANY
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canEdtCompany(req, res, next) {
  try {
    if (
      (req.user.company_permission && COMPANY_PERMISSION.EDT_COMPANY) ===
      COMPANY_PERMISSION.EDT_COMPANY
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canDelCompany(req, res, next) {
  try {
    if (
      (req.user.company_permission && COMPANY_PERMISSION.DEL_COMPANY) ===
      COMPANY_PERMISSION.DEL_COMPANY
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canAddCompanyNote(req, res, next) {
  try {
    if (
      (req.user.company_permission && COMPANY_PERMISSION.ADD_COMPANY_NOTE) ===
      COMPANY_PERMISSION.ADD_COMPANY_NOTE
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canDelCompanyNote(req, res, next) {
  try {
    if (
      (req.user.company_permission && COMPANY_PERMISSION.DEL_COMPANY_NOTE) ===
      COMPANY_PERMISSION.DEL_COMPANY_NOTE
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
