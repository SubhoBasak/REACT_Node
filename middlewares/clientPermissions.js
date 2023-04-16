import { CLIENT_PERMISSION } from "../constants.js";

export function canAddClient(req, res, next) {
  try {
    if (
      (req.user.client_permission && CLIENT_PERMISSION.ADD_CLIENT) ===
      CLIENT_PERMISSION.ADD_CLIENT
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canEdtClient(req, res, next) {
  try {
    if (
      (req.user.client_permission && CLIENT_PERMISSION.EDT_CLIENT) ===
      CLIENT_PERMISSION.EDT_CLIENT
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canDelClient(req, res, next) {
  try {
    if (
      (req.user.client_permission && CLIENT_PERMISSION.DEL_CLIENT) ===
      CLIENT_PERMISSION.DEL_CLIENT
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canAddClientNote(req, res, next) {
  try {
    if (
      (req.user.client_permission && CLIENT_PERMISSION.ADD_CLIENT_NOTE) ===
      CLIENT_PERMISSION.ADD_CLIENT_NOTE
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canDelClientNote(req, res, next) {
  try {
    if (
      (req.user.client_permission && CLIENT_PERMISSION.DEL_CLIENT_NOTE) ===
      CLIENT_PERMISSION.DEL_CLIENT_NOTE
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
