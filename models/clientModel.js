import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    business: {
      type: mongoose.Types.ObjectId,
      ref: "businessModel",
      required: false,
      index: true,
    },
    name: { type: String, trim: true, required: true, maxLength: 100 },
    email: { type: String, trim: true, maxLength: 255 },
    phone: { type: String, trim: true, maxLength: 25 },
    gender: { type: Number, min: 0, max: 3 }, // 1 - male, 2 - female, 3 - others
    dob: { type: Date },
    occupation: { type: String, trim: true, maxLength: 100 },
    address1: { type: String, trim: true, maxLength: 100, required: true },
    address2: { type: String, trim: true, maxLength: 100 },
    city: { type: String, trim: true, maxLength: 100 },
    state: { type: String, trim: true, maxLength: 100 },
    country: { type: String, trim: true, maxLength: 100 },
    zip: { type: String, trim: true, maxLength: 25 },
    landmark: { type: String, trim: true, maxLength: 100 },
    source: { type: Number, min: 0 },
    agent: { type: mongoose.Types.ObjectId, ref: "agentModel" },
  },
  { timestamps: true }
);

export default mongoose.model("clientModel", clientSchema);
