import mongoose from "mongoose";

const requirementCompanySchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: "companyModel",
      required: true,
      index: true,
    },
    stage: { type: String, maxLength: 100, trim: true },
    finally: { type: Number, min: 0, max: 2 }, // 1 -> cancelled, 2 -> completed
    tagged: [{ type: mongoose.Types.ObjectId, ref: "representativeModel" }],
    title: { type: String, trim: true, required: true, maxLength: 100 },
    category: { type: Number, min: 0 },
    budget: { type: Number, min: 0 },
    area: { type: Number, min: 0 },
    city: { type: String, trim: true, maxLength: 100 },
    state: { type: String, trim: true, maxLength: 100 },
    locationDetails: { type: String, trim: true, maxLength: 500 },
    otherDetails: { type: String, trim: true, maxLength: 1000 },
  },
  { timestamps: true }
);

export default mongoose.model(
  "requirementCompanyModel",
  requirementCompanySchema
);
