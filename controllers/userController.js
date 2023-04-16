import { Validator } from "node-input-validator";

// models
import userModel from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    if (req.query.id)
      return res.json(await userModel.findById(req.query.id).lean());
    else return res.json(await userModel.find().lean());
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addUser = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      email: "required|email",
      name: "required|maxLength:100",
      agent_permission: "required|min:0",
      client_permission: "required|min:0",
      company_permission: "required|min:0",
      requirement_permission: "required|min:0",
      call_permission: "required|min:0",
      property_permission: "required|min:0",
      other_permission: "required|min:0",
      user_permission: "required|min:0",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const user = await userModel.create(req.body);
    return res.json({ id: user.id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const edtUser = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
      email: "required|email",
      name: "required|maxLength:100",
      agent_permission: "required|min:0",
      client_permission: "required|min:0",
      company_permission: "required|min:0",
      requirement_permission: "required|min:0",
      call_permission: "required|min:0",
      property_permission: "required|min:0",
      other_permission: "required|min:0",
      user_permission: "required|min:0",
    });

    delete req.body.active;

    if (!(await vld.check())) return res.sendStatus(400);

    await userModel.findByIdAndUpdate(req.body.id, req.body).select("").lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delUser = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      id: "required|minLength:8",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await userModel.findByIdAndDelete(req.body.id).select("").lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const activateUsers = async (req, res) => {
  try {
    if (req.body.id) {
      const vld = new Validator(req.body, {
        id: "required|minLength:8",
      });

      if (!(await vld.check())) return res.sendStatus(400);

      await userModel.findByIdAndUpdate(req.body.id, { active: true });

      return res.sendStatus(200);
    } else {
      const vld = new Validator(req.body, {
        users: "required|array",
      });

      if (!(await vld.check())) return res.sendStatus(400);

      await userModel
        .updateMany({ _id: { $in: req.body.users } }, { active: true })
        .select("")
        .lean();

      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deactivateUsers = async (req, res) => {
  try {
    if (req.body.id) {
      const vld = new Validator(req.body, {
        id: "required|minLength:8",
      });

      if (!(await vld.check())) return res.sendStatus(400);

      await userModel.findByIdAndUpdate(req.body.id, { active: false });

      return res.sendStatus(200);
    } else {
      const vld = new Validator(req.body, {
        users: "required|array",
      });

      if (!(await vld.check())) return res.sendStatus(400);

      await userModel
        .updateMany({ _id: { $in: req.body.users } }, { active: false })
        .select("")
        .lean();

      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delUsers = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      users: "required|array",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    await userModel
      .deleteMany({ _id: { $in: req.body.users } })
      .select("")
      .lean();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
