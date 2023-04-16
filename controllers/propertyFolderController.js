import { Validator } from "node-input-validator";

// models
import propertyModel from "../models/propertyModel.js";
import propertyFolderModel from "../models/propertyFolderModel.js";

export const getFolderItems = async (req, res) => {
  try {
    return res.json(
      await Promise.all(
        req.query.id?.length > 8
          ? [
              propertyFolderModel.findById(req.query.id).lean(),
              propertyModel.find({ folder: req.query.id }).lean(),
            ]
          : [
              propertyFolderModel.find().lean(),
              propertyModel.find({ folder: null }).lean(),
            ]
      )
    );
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delProperties = async (req, res) => {
  try {
    if (req.body.folders && req.body.properties) {
      await Promise.all([
        propertyModel
          .deleteMany({
            $or: [
              { _id: { $in: req.body.properties } },
              { folder: { $in: req.body.folders } },
            ],
          })
          .lean()
          .select(""),
        propertyFolderModel
          .deleteMany({ _id: { $in: req.body.folders } })
          .lean()
          .select(""),
      ]);

      return res.sendStatus(200);
    } else if (req.body.properties) {
      await propertyModel
        .deleteMany({ _id: { $in: req.body.properties } })
        .lean()
        .select("");

      return res.sendStatus(200);
    } else if (req.body.folders) {
      await Promise.all([
        propertyFolderModel
          .deleteMany({ _id: { $in: req.body.folders } })
          .lean()
          .select(""),
        propertyModel
          .deleteMany({ folder: { $in: req.body.folders } })
          .lean()
          .select(""),
      ]);

      return res.sendStatus(200);
    }

    const vld = new Validator(req.body, {
      id: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await Promise.all([
      propertyFolderModel.findByIdAndDelete(req.body.id).select("").lean(),
      propertyModel.deleteMany({ folder: req.body.id }).select("").lean(),
    ]);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addPropertyFolder = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      title: "required|maxLength:100",
      info: "maxLength:500",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const property = await propertyFolderModel.create(req.body);
    return res.json({ id: property.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtPropertyFolder = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
      title: "required|maxLength:100",
      info: "maxLength:500",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await propertyFolderModel.findByIdAndUpdate(req.body.id, req.body);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const insertProperty = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      pid: "required|minLength:8",
      fid: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const folder = await propertyFolderModel
      .findById(req.body.fid)
      .select("_id")
      .lean();
    if (!folder) return res.sendStatus(404);

    const property = await propertyModel
      .findById(req.body.pid)
      .select("parent");
    if (!property) return req.sendStatus(404);

    property.parent = folder._id;

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
