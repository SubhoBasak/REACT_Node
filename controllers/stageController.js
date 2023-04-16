import { Validator } from "node-input-validator";

// models
import stageModel from "../models/stageModel.js";

export const edtStage = async (req, res) => {
  try {
    const vld = new Validator(req.body, { stages: "arrayUnique" });

    if (!(await vld.check())) return res.sendStatus(400);

    await stageModel
      .findOneAndUpdate({}, { stages: req.body.stages || [] })
      .select("")
      .lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
