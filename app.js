import express from "express";
import mongoose from "mongoose";
import upload from "express-fileupload";
import sanitizer from "express-mongo-sanitize";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

// routers
import agentRouter from "./routers/agentRouter.js";
import authRouter from "./routers/authRouter.js";
import clientRouter from "./routers/clientRouter.js";
import compnayRouter from "./routers/companyRouter.js";
import contactRouter from "./routers/contactRouter.js";
import businessRouter from "./routers/businessRouter.js";
import leadRouter from "./routers/leadRouter.js";
import leadCompanyRouter from "./routers/leadCompanyRouter.js";
import propertyFolderRouter from "./routers/propertyFolderRouter.js";
import propertyRouter from "./routers/propertyRouter.js";
import representativeRouter from "./routers/representativeRouter.js";
import requirementRouter from "./routers/requirementRouter.js";
import requirementCompanyRouter from "./routers/requirementCompanyRouter.js";
import stageRouter from "./routers/stageRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(sanitizer());
app.use(upload({ limits: 5242880 }));
app.use(express.json({ limit: "5mb", extended: true }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use("/media", express.static("media"));
app.use("/static", express.static("frontend/static"));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// all routes
app.use("/agent", agentRouter);
app.use("/auth", authRouter);
app.use("/client", clientRouter);
app.use("/company", compnayRouter);
app.use("/contacts", contactRouter);
app.use("/business", businessRouter);
app.use("/folder", propertyFolderRouter);
app.use("/lead", leadRouter);
app.use("/leadCompany", leadCompanyRouter);
app.use("/property", propertyRouter);
app.use("/repr", representativeRouter);
app.use("/rqmn", requirementRouter);
app.use("/rqmnCompany", requirementCompanyRouter);
app.use("/stage", stageRouter);
app.use("/user", userRouter);

// unhandled routes
app.use("*", (_, res) => res.redirect(process.env.WEBSITE_URL));

app.listen(process.env.PORT || 5000, process.env.SERVER_IP, () =>
  console.log(
    `Server is running on ${process.env.SERVER_IP}:${process.env.PORT}`
  )
);
