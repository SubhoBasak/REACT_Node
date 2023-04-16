import { Validator } from "node-input-validator";

// models
import leadModel from "../models/leadModel.js";

export const addLead = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      requirement: "required|minLength:8",
      title: "required|maxLength:100",
      due_date: "required|date",
      attempt_date: "date",
      comment: "maxLength:1000",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const lead = await leadModel.create(req.body);

    return res.json({ id: lead.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtLead = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
      requirement: "required|minLength:8",
      title: "required|maxLength:100",
      due_date: "required|date",
      attempt_date: "date",
      comment: "maxLength:1000",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await leadModel.findByIdAndUpdate(req.body.id, req.body).select("").lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delLead = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await leadModel.findByIdAndDelete(req.body.id).select("").lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
