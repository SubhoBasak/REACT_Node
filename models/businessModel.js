import mongoose from "mongoose";

const businessSchema = mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 100, trim: true },
    email: {
      type: String,
      required: true,
      maxLength: 255,
      index: true,
      trim: true,
    },
    phone: { type: String, maxLength: 25, trim: true },
    address1: { type: String, maxLength: 100, required: true, trim: true },
    address2: { type: String, maxLength: 100, trim: true },
    city: { type: String, maxLength: 100, trim: true },
    state: { type: String, maxLength: 100, trim: true },
    country: { type: String, maxLength: 100, trim: true },
    zip: { type: String, maxLength: 25, trim: true },
    landmark: { type: String, maxLength: 100, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("businessModel", businessSchema);
