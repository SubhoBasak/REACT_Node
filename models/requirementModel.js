import mongoose from "mongoose";

const requirementSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      ref: "clientModel",
      requeired: true,
      index: true,
    },
    stage: { type: String, maxLength: 100, trim: true },
    finally: { type: Number, min: 0, max: 2 }, // 1 -> cancelled, 2 -> completed
    title: { type: String, trim: true, required: true, maxLength: 100 },
    category: { type: Number, min: 0 },
    budget: { type: Number, min: 0 },
    area: { type: Number, min: 0 },
    city: { type: String, trim: true, maxLength: 100 },
    state: { type: String, trim: true, maxLength: 100 },
    locationDetails: { type: String, trim: true, maxLength: 500 },
    otherDetails: { type: String, trim: true, maxLength: 1000 },
    history: [
      {
        stage: { type: String, maxLength: 100, trim: true, required: true },
        date: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("requirementModel", requirementSchema);
