import { Validator } from "node-input-validator";

// models
import businessModel from "../models/businessModel.js";
import stageModel from "../models/stageModel.js";

export const addBusiness = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      name: "required|maxLength:100",
      email: "required|email",
      phone: "maxLength:25",
      address1: "required|maxLength:100",
      address2: "maxLength:100",
      city: "maxLength:100",
      state: "maxLength:100",
      country: "maxLength:100",
      zip: "maxLength:25",
      landmark: "maxLength:100",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const business = await businessModel.create(req.body);
    await stageModel.create({ business: business.id });

    return res.json({ id: business.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtBusiness = async (req, res) => {
  try {
    if (req.body.email) return res.sendStatus(400);

    const vld = new Validator(req.body, {
      id: "required|minLength:8",
      name: "required|maxLength:100",
      phone: "maxLength:25",
      address1: "required|maxLength:100",
      address2: "maxLength:100",
      city: "maxLength:100",
      state: "maxLength:100",
      country: "maxLength:100",
      zip: "maxLength:25",
      landmark: "maxLength:100",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await businessModel
      .findByIdAndUpdate(req.body.id, req.body)
      .select("")
      .lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delBusiness = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await businessModel.findByIdAndDelete(req.body.id).select("").lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
