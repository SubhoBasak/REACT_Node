import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    business: {
      type: mongoose.Types.ObjectId,
      ref: "businessModel",
      required: false,
      index: true,
    },
    folder: { type: mongoose.Types.ObjectId, ref: "propertyFolderModel" },
    image: { type: Boolean },
    title: { type: String, trim: true, required: true, maxLength: 100 },
    price: { type: Number, min: 0 },
    area: { type: Number, min: 0 },
    category: { type: Number, required: true, min: 0 },
    address1: { type: String, trim: true, maxLength: 100, required: true },
    address2: { type: String, trim: true, maxLength: 100 },
    city: { type: String, trim: true, maxLength: 100 },
    state: { type: String, trim: true, maxLength: 100 },
    country: { type: String, trim: true, maxLength: 100 },
    zip: { type: String, trim: true, maxLength: 25 },
    landmark: { type: String, trim: true, maxLength: 100 },
    details: { type: String, trim: true, maxLength: 1000 },
  },
  { timestamps: true }
);

export default mongoose.model("propertyModel", propertySchema);
