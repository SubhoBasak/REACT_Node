import { Validator } from "node-input-validator";

// models
import agentModel from "../models/agentModel.js";
import agentNoteModel from "../models/agentNoteModel.js";
import clientModel from "../models/clientModel.js";

export const getAgent = async (req, res) => {
  try {
    const vld = new Validator(req.query, {
      id: "required|minLength:8",
      details: "boolean",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    switch (req.query.details) {
      case "TRUE":
      case "True":
      case "true":
      case "1":
      case 1:
        req.query.details = true;
        break;
      default:
        req.query.details = false;
    }

    const details = await Promise.all([
      req.query.details ? agentModel.findById(req.query.id).lean() : null,
      agentNoteModel
        .find({ agent: req.query.id })
        .select("id note createdAt modifiedAt")
        .lean(),
      clientModel.find({ agent: req.query.id }).lean(),
    ]);

    return res.json({
      details: details[0],
      notes: details[1],
      clients: details[2],
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addAgent = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      name: "required|maxLength:100",
      email: "email",
      phone: "maxLength:25",
      gender: "min:0",
      address1: "required|maxLength:100",
      address2: "maxLength:100",
      city: "maxLength:100",
      state: "maxLength:100",
      country: "maxLength:100",
      zip: "maxLength:100",
      landmark: "maxLength:100",
      deals: "maxLength:500",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const agent = await agentModel.create(req.body);
    return res.json({ id: agent.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtAgent = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
      name: "required|maxLength:100",
      email: "email",
      phone: "maxLength:25",
      gender: "min:0",
      address1: "required|maxLength:100",
      address2: "maxLength:100",
      city: "maxLength:100",
      state: "maxLength:100",
      country: "maxLength:100",
      zip: "maxLength:100",
      landmark: "maxLength:100",
      deals: "maxLength:500",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await agentModel.findByIdAndUpdate(req.body.id, req.body).select("").lean();
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const delAgent = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await Promise.all([
      agentModel.findByIdAndDelete(req.body.id).select("").lean(),
      agentNoteModel.deleteMany({ agent: req.body.id }).select("").lean(),
    ]);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addAgentNote = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      agent: "required|minLength:8",
      note: "required|maxLength:1000",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const note = await agentNoteModel.create(req.body);
    return res.json({ id: note._id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delAgentNote = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await agentNoteModel.findByIdAndDelete(req.body.id).lean();
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
