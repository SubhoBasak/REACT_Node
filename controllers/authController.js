import jwt from "jsonwebtoken";
import { Validator } from "node-input-validator";
import { verifyEmail } from "../email/email.js";

// models
import userModel from "../models/userModel.js";

export const loginUser = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      email: "required|email",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    const user = await userModel
      .findOne({
        email: req.body.email,
        active: true,
      })
      .select("id email business")
      .lean();

    if (!user) return res.sendStatus(404);

    const otp = Math.floor(100000 + Math.random() * 900000);

    await verifyEmail(req.body.email, otp);

    res.cookie("token", JSON.stringify({ otp }), {
      httpOnly: true,
      maxAge: 300000,
      signed: true,
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
      path: "/",
      sameSite: "none",
    });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const verifyUser = async (req, res) => {
  try {
    const vld = new Validator(req.body, {
      email: "required|email",
      otp: "required|min:100000|max:999999",
    });

    if (!(await vld.check())) return res.sendStatus(400);

    if (!req.signedCookies["token"]) return res.sendStatus(401);
    else if (JSON.parse(req.signedCookies["token"]).otp !== req.body.otp)
      return res.sendStatus(401);

    res.clearCookie("token");

    const user = await userModel.findOne({ email: req.body.email }).lean();

    res.cookie(
      "auth",
      jwt.sign({ user }, process.env.AUTH_JWT_KEY),
      {
        expiresIn: "6h",
      },
      {
        httpOnly: true,
        maxAge: 21600000,
        signed: true,
        secure: true,
        domain: process.env.COOKIE_DOMAIN,
        path: "/",
        sameSite: "none",
      }
    );

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
