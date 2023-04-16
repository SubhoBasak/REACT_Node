import { Validator } from "node-input-validator";

// models
import requirementCompanyModel from "../models/requirementCompanyModel.js";
import requirementModel from "../models/requirementModel.js";
import stageModel from "../models/stageModel.js";
import leadModel from "../models/leadModel.js";

export const getRqmn = async (req, res) => {
  try {
    if (req.query.id) {
      const details = await Promise.all([
        requirementModel
          .findById(req.query.id)
          .populate([
            {
              path: "client",
              select:
                "name phone email gender dob occupation address1 address2 city state country zip landmark",
            },
          ])
          .lean(),
        stageModel.findOne().select("stages").lean(),
        leadModel.find({ requirement: req.query.id }).lean(),
      ]);

      return res.json({
        details: details[0],
        stages: details[1].stages,
        leads: details[2],
      });
    } else {
      const details = await Promise.all([
        requirementModel
          .find()
          .populate([{ path: "client", select: "name phone email address1" }])
          .lean(),
        requirementCompanyModel
          .find()
          .populate([{ path: "company", select: "name phone email address2" }])
          .lean(),
        stageModel.findOne().select("stages").lean(),
      ]);

      return res.json({
        client: details[0],
        company: details[1],
        stages: details[2].stages,
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addRqmn = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      client: "required|minLength:8",
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

    const rqmn = await requirementModel.create(req.body);

    return res.json({ id: rqmn._id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtRqmn = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      id: "required|minLength:8",
      title: "required|maxLength:100",
      area: "min:0",
      budget: "min:0",
      category: "min:0",
      city: "maxLength:100",
      state: "maxLength:100",
      stage: "maxLength:100",
      finally: "boolean",
      locationDetails: "maxLength:500",
      otherDetails: "maxLength:1000",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await requirementModel
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
      await requirementModel.findByIdAndDelete(req.body.id).select("").lean();
    else if (req.body.ids?.length > 1)
      await requirementModel
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
