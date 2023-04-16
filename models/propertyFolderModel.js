import mongoose from "mongoose";

const propertyFolderSchema = mongoose.Schema({
  business: {
    type: mongoose.Types.ObjectId,
    ref: "businessModel",
    required: false,
    index: true,
  },
  image: { type: Boolean },
  title: { type: String, required: true, maxLength: 100, trim: true },
  info: { type: String, maxLength: 500, trim: true },
});

export default mongoose.model("propertyFolderModel", propertyFolderSchema);
