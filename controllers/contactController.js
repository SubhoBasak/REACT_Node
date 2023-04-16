// models
import clientModel from "../models/clientModel.js";
import companyModel from "../models/companyModel.js";
import agentModel from "../models/agentModel.js";

export const getAllContacts = async (_, res) => {
  try {
    return res.json(
      await Promise.all([
        clientModel
          .find()
          .populate([{ path: "agent", select: "name email address" }])
          .lean(),
        companyModel.find().lean(),
        agentModel.find().lean(),
      ])
    );
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delContacts = async (req, res) => {
  try {
    await Promise.all([
      clientModel
        .deleteMany({ _id: { $in: req.body.clients } })
        .select("")
        .lean(),
      companyModel
        .deleteMany({ _id: { $in: req.body.companies } })
        .select("")
        .lean(),
      agentModel
        .deleteMany({ _id: { $in: req.body.agents } })
        .select("")
        .lean(),
    ]);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
