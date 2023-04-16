import jwt from "jsonwebtoken";
import { Validator } from "node-input-validator";

// import models
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  try {
    const vld = new Validator(req.headers, {
      authorization: "required|string",
    });

    if (!(await vld.check())) return res.sendStatus(401);

    const token = jwt.verify(req.headers.authorization, process.env.AUTH_TOKEN);
    const user = await userModel.findById(token.id);

    if (!user) return res.sendStatus(401);

    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default authUser;
