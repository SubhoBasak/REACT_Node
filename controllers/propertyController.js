import { Validator } from "node-input-validator";

// models
import propertyModel from "../models/propertyModel.js";

export const getProperty = async (req, res) => {
  try {
    const vld = new Validator(req.query, {
      id: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    return res.json(await propertyModel.findById(req.query.id).lean());
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addProperty = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      title: "required|maxLength:100",
      folder: "minLength:8",
      price: "min:0",
      category: "min:0",
      address1: "required|maxLength:100",
      address2: "maxLength:100",
      city: "maxLength:100",
      state: "maxLength:100",
      country: "maxLength:100",
      zip: "maxLength:25",
      landmark: "maxLength:100",
      details: "maxLength:1000",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const property = await propertyModel.create(req.body);

    return res.json({ id: property.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtProperty = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
      title: "required|maxLength:100",
      price: "min:0",
      category: "min:0",
      address1: "required|maxLength:100",
      address2: "maxLength:100",
      city: "maxLength:100",
      state: "maxLength:100",
      country: "maxLength:100",
      zip: "maxLength:25",
      landmark: "maxLength:100",
      details: "maxLength:1000",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await propertyModel
      .findByIdAndUpdate(req.body.id, req.body)
      .select("")
      .lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delProperty = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await propertyModel.findByIdAndDelete(req.body.id).select("").lean();
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
