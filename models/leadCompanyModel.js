import mongoose from "mongoose";

const leadCompanySchema = mongoose.Schema(
  {
    requirement: {
      type: mongoose.Types.ObjectId,
      ref: "requirementCompanyModel",
      required: true,
      index: true,
    },
    tagged: [
      {
        type: mongoose.Types.ObjectId,
        ref: "representativeModel",
        required: true,
      },
    ],
    title: { type: String, maxLength: 100, trim: true, required: true },
    medium: { type: Number, min: 0 },
    due_date: { type: Date },
    attempt_date: { type: Date },
    comment: { type: String, maxLength: 1000, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("leadCompanyModel", leadCompanySchema);
