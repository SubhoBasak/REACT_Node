import { Validator } from "node-input-validator";

// models
import requirementCompanyModel from "../models/requirementCompanyModel.js";
import leadCompanyModel from "../models/leadCompanyModel.js";
import stageModel from "../models/stageModel.js";

export const getRqmn = async (req, res) => {
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
      req.query.details
        ? requirementCompanyModel
            .findById(req.query.id)
            .populate([
              {
                path: "company",
                select:
                  "name email phone industry address1 address2 city state country zip",
              },
            ])
            .lean()
        : null,
      stageModel.findOne().select("stages").lean(),
      leadCompanyModel.find({ requirement: req.query.id }).lean(),
    ]);

    return res.json({
      details: details[0],
      stages: details[1].stages,
      leads: details[2],
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addRqmn = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      company: "required|minLength:8",
      title: "required|maxLength:100",
      area: "min:0",
      budget: "min:0",
      category: "min:0",
      city: "maxLength:100",
      state: "maxLength:100",
      locationDetails: "maxLength:500",
      otherDetails: "maxLength:1000",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const rqmn = await requirementCompanyModel.create(req.body);

    return res.json({ id: rqmn._id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtRqmn = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
      title: "required|maxLength:100",
      area: "min:0",
      budget: "min:0",
      category: "min:0",
      city: "maxLength:100",
      state: "maxLength:100",
      locationDetails: "maxLength:500",
      otherDetails: "maxLength:1000",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await requirementCompanyModel
      .findByIdAndUpdate(req.body.id, req.body)
      .select("")
      .lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delRqmn = async (req, res) => {
  try {
    if (req.body.id?.length > 8)
      await requirementCompanyModel
        .findByIdAndDelete(req.body.id)
        .select("")
        .lean();
    else if (req.body.ids?.length > 1)
      await requirementCompanyModel
        .deleteMany({ _id: { $in: req.body.ids } })
        .select("")
        .lean();
    else return res.sendStatus(400);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
