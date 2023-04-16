import mongoose from "mongoose";

const clientNoteSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      ref: "clientModel",
      required: true,
      index: true,
    },
    note: { type: String, required: true, maxLength: 1000, trim: true },
  },
  { timestamps: { createdAt: true } }
);

export default mongoose.model("clientNoteModel", clientNoteSchema);
