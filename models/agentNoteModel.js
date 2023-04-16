import mongoose from "mongoose";

const agentNoteSchema = mongoose.Schema(
  {
    agent: {
      type: mongoose.Types.ObjectId,
      ref: "agentModel",
      required: true,
      index: true,
    },
    note: { type: String, required: true, maxLength: 1000, trim: true },
  },
  { timestamps: { createdAt: true } }
);

export default mongoose.model("agentNoteModel", agentNoteSchema);
