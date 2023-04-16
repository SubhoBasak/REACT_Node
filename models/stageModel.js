import mongoose from "mongoose";

const stageSchema = mongoose.Schema({
  business: {
    type: mongoose.Types.ObjectId,
    ref: "businessModel",
    required: true,
    index: true,
  },
  stages: [{ type: String, maxLength: 100, trim: true }],
});

export default mongoose.model("stageModel", stageSchema);
