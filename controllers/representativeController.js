import { Validator } from "node-input-validator";

// models
import representativeModel from "../models/representativeModel.js";

export const getRepresentatives = async (req, res) => {
  try {
    let vld = new Validator(req.query, {
      company: "required|minLength:8",
    });

    if (!vld.check()) return res.sendStatus(400);

    return res.json(
      await representativeModel
        .find({ company: req.query.company })
        .select("_id name designation phone email")
        .lean()
    );
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addRepresentative = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      company: "required|minLength:8",
      name: "required|maxLength:100",
      designation: "maxLength:100",
      email: "email",
      phone: "maxLength:25",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const rep = await representativeModel.create(req.body);
    return res.json({ id: rep.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtRepresentative = async (req, res) => {
  try {
    let vld = new Validator(req.body, {
      id: "required|minLength:8",
      name: "required|maxLength:100",
      designation: "maxLength:100",
      email: "email",
      phone: "maxLength:25",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await representativeModel
      .findByIdAndUpdate(req.body.id, req.body)
      .select("")
      .lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delRepresentative = async (req, res) => {
  try {
    if (req.body.id?.length > 8)
      await representativeModel
        .findByIdAndDelete(req.body.id)
        .select("")
        .lean();
    else if (req.body.ids?.length > 1)
      await representativeModel
        .deleteMany({ _id: { $in: req.body.ids } })
        .select("")
        .lean();
    else return res.sendStatus(400);

    await representativeModel.findByIdAndDelete(req.body.id).select("").lean();
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
