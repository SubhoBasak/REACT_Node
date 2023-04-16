import { AGENT_PERMISSION } from "../constants.js";

export function canAddAgent(req, res, next) {
  try {
    if (
      (req.user.agent_permission && AGENT_PERMISSION.ADD_AGENT) ===
      AGENT_PERMISSION.ADD_AGENT
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canEdtAgent(req, res, next) {
  try {
    if (
      (req.user.agent_permission && AGENT_PERMISSION.EDT_AGENT) ===
      AGENT_PERMISSION.EDT_AGENT
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canDelAgent(req, res, next) {
  try {
    if (
      (req.user.agent_permission && AGENT_PERMISSION.DEL_AGENT) ===
      AGENT_PERMISSION.DEL_AGENT
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canAddAgentNote(req, res, next) {
  try {
    if (
      (req.user.agent_permission && AGENT_PERMISSION.ADD_AGENT_NOTE) ===
      AGENT_PERMISSION.ADD_AGENT_NOTE
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function canDelAgentNote(req, res, next) {
  try {
    if (
      (req.user.agent_permission && AGENT_PERMISSION.DEL_AGENT_NOTE) ===
      AGENT_PERMISSION.DEL_AGENT_NOTE
    )
      next();
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
