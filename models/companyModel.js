import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    business: {
      type: mongoose.Types.ObjectId,
      ref: "businessModel",
      required: false,
      index: true,
    },
    name: { type: String, maxLength: 100, required: true, trim: true },
    email: { type: String, maxLength: 255, trim: true },
    phone: { type: String, maxLength: 25, trim: true },
    about: { type: String, maxLength: 500, trim: true },
    industry: { type: String, maxLength: 100, trim: true },
    address1: { type: String, trim: true, maxLength: 100, required: true },
    address2: { type: String, trim: true, maxLength: 100 },
    city: { type: String, trim: true, maxLength: 100 },
    state: { type: String, trim: true, maxLength: 100 },
    country: { type: String, trim: true, maxLength: 100 },
    zip: { type: String, trim: true, maxLength: 25 },
    landmark: { type: String, trim: true, maxLength: 100 },
  },
  { timestamps: true }
);

export default mongoose.model("companyModel", companySchema);
