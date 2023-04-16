import mongoose from "mongoose";

const agentSchema = mongoose.Schema(
  {
    business: {
      type: mongoose.Types.ObjectId,
      ref: "businessModel",
      required: false,
      index: true,
    },
    name: { type: String, required: true, maxLength: 100, trim: true },
    email: {
      type: String,
      required: true,
      maxLength: 255,
      index: true,
      trim: true,
    },
    phone: { type: String, maxLength: 25, trim: true },
    gender: { type: Number, min: 0, max: 3 }, // 1 - male, 2 - female, 3 - others
    dob: { type: Date },
    address1: { type: String, maxLength: 100, required: true, trim: true },
    address2: { type: String, maxLength: 100, trim: true },
    city: { type: String, maxLength: 100, trim: true },
    state: { type: String, maxLength: 100, trim: true },
    country: { type: String, maxLength: 100, trim: true },
    zip: { type: String, maxLength: 25, trim: true },
    landmark: { type: String, maxLength: 100, trim: true },
    deals: { type: String, maxLength: 500, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("agentModel", agentSchema);
