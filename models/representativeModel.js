import mongoose from "mongoose";

const representativeSchema = mongoose.Schema({
  company: {
    type: mongoose.Types.ObjectId,
    ref: "companyModel",
    index: true,
    required: true,
  },
  name: { type: String, maxLength: 100, trim: true, required: true },
  designation: { type: String, maxLength: 100, trim: true },
  phone: { type: String, maxLength: 25, trim: true },
  email: { type: String, maxLength: 255, trim: true },
});

export default mongoose.model("representativeModel", representativeSchema);
