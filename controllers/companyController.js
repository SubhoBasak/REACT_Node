import { Validator } from "node-input-validator";

// models
import agentModel from "../models/agentModel.js";
import companyModel from "../models/companyModel.js";
import companyNoteModel from "../models/companyNoteModel.js";
import representativeModel from "../models/representativeModel.js";
import requirementCompanyModel from "../models/requirementCompanyModel.js";

export const getCompany = async (req, res) => {
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
      req.query.details ? companyModel.findById(req.query.id).lean() : null,
      companyNoteModel
        .find({ company: req.query.id })
        .select("id note createdAt")
        .lean(),
      representativeModel
        .find({ company: req.query.id })
        .select("id name phone email designation")
        .lean(),
      requirementCompanyModel
        .find({ company: req.query.id })
        .select(
          "id title category budget area city state locationDetails otherDetails"
        )
        .lean(),
      agentModel.find().select("id name email address1").lean(),
    ]);

    return res.json({
      details: details[0],
      notes: details[1],
      reprs: details[2],
      rqmns: details[3],
      agents: details[4],
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addCompany = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      name: "required|maxLength:100",
      email: "email",
      phone: "maxLength:25",
      about: "maxLength:500",
      industry: "maxLength:100",
      address1: "maxLength:100",
      address2: "maxLength:100",
      city: "maxLength:100",
      state: "maxLength:100",
      country: "maxLength:100",
      zip: "maxLength:25",
      landmark: "maxLength:100",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const company = await companyModel.create(req.body);
    return res.json({ id: company.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtCompany = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
      name: "required|maxLength:100",
      email: "email",
      phone: "maxLength:25",
      about: "maxLength:500",
      industry: "maxLength:100",
      address1: "maxLength:100",
      address2: "maxLength:100",
      city: "maxLength:100",
      state: "maxLength:100",
      country: "maxLength:100",
      zip: "maxLength:25",
      landmark: "maxLength:100",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await companyModel
      .findByIdAndUpdate(req.body.id, req.body)
      .select("")
      .lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delCompany = async (req, res) => {
  try {
    const vld = new Validator(req.body, { id: "required|minLength:8" });
    if (!(await vld.check())) return res.sendStatus(400);

    await Promise.all([
      companyModel.findByIdAndDelete(req.body.id).select("").lean(),
      companyNoteModel.deleteMany({ company: req.body.id }).select("").lean(),
      requirementCompanyModel
        .deleteMany({ company: req.body.id })
        .select("")
        .lean(),
    ]);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addCompanyNote = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      company: "required|minLength:8",
      note: "required|maxLength:1000",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const note = await companyNoteModel.create(req.body);
    return res.json({ id: note.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delCompanyNote = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await companyNoteModel.findByIdAndDelete(req.body.id).lean();
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
