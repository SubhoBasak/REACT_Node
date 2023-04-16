import { Validator } from "node-input-validator";

// models
import agentModel from "../models/agentModel.js";
import clientModel from "../models/clientModel.js";
import clientNoteModel from "../models/clientNoteModel.js";
import requirementModel from "../models/requirementModel.js";

export const getClient = async (req, res) => {
  try {
    let vld = new Validator(req.query, {
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
      req.query.details
        ? clientModel
            .findById(req.query.id)
            .populate([{ path: "agent", select: "name email address1" }])
            .lean()
        : null,
      clientNoteModel
        .find({ client: req.query.id })
        .select("id note createdAt")
        .lean(),
      requirementModel
        .find({ client: req.query.id })
        .select(
          "id title category budget area city state locationDetails otherDetils"
        )
        .lean(),
      agentModel.find().select("id name email address1").lean(),
    ]);

    return res.json({
      details: details[0],
      notes: details[1],
      rqmns: details[2],
      agents: details[3],
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addClient = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      name: "required|maxLength:100",
      email: "email",
      phone: "maxLength:25",
      gender: "min:0",
      occupation: "maxLength:100",
      address1: "required|maxLength:100",
      address2: "maxLength:100",
      city: "maxLength:100",
      state: "maxLength:100",
      country: "maxLength:100",
      zip: "maxLength:25",
      landmark: "maxLength:100",
      source: "min:0",
      agent: "minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const client = await clientModel.create(req.body);
    return res.json({ id: client.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtClient = async (req, res) => {
  try {
    console.log(req.body);
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
      name: "required|maxLength:100",
      email: "email",
      phone: "maxLength:25",
      gender: "min:0",
      occupation: "maxLength:100",
      address1: "required|maxLength:100",
      address2: "maxLength:100",
      city: "maxLength:100",
      state: "maxLength:100",
      country: "maxLength:100",
      zip: "maxLength:25",
      landmark: "maxLength:100",
      source: "min:0",
      agent: "minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await clientModel
      .findByIdAndUpdate(req.body.id, req.body)
      .select("")
      .lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delClient = async (req, res) => {
  try {
    if (req.body.id?.length > 8)
      await Promise.all([
        clientModel.findByIdAndDelete(req.body.id).select("").lean(),
        clientNoteModel.deleteMany({ client: req.body.id }).select("").lean(),
        requirementModel.deleteMany({ client: req.body.id }).select("").lean(),
      ]);
    else if (req.body.ids?.length > 1)
      await Promise.all([
        clientModel
          .deleteMany({ _id: { $in: req.body.ids } })
          .select("")
          .lean(),
        clientNoteModel
          .deleteMany({ client: { $in: req.body.ids } })
          .select("")
          .lean(),
        requirementModel
          .deleteMany({ client: { $in: req.body.ids } })
          .select("")
          .lean(),
      ]);
    else return res.sendStatus(400);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addClientNote = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      client: "required|minLength:8",
      note: "required|maxLength:1000",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const note = await clientNoteModel.create(req.body);
    return res.json({ id: note.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delClientNote = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await clientNoteModel.findByIdAndDelete(req.body.id).select("").lean();
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
