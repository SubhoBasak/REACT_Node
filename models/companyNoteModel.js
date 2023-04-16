import mongoose from "mongoose";

const companyNoteSchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: "companyModel",
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
    note: { type: String, required: true, maxLength: 1000, trim: true },
  },
  { timestamps: { createdAt: true } }
);

export default mongoose.model("companyNoteModel", companyNoteSchema);
