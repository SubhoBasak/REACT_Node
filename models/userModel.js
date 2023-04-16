import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  business: {
    type: mongoose.Types.ObjectId,
    ref: "businessModel",
    required: false,
    index: true,
  },
  name: { type: String, maxLength: 100, trim: true, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
    index: true,
  },
  active: { type: Boolean, default: true },
  last_login: { type: Date },
  agent_permission: { type: Number, default: 0, min: 0 },
  client_permission: { type: Number, default: 0, min: 0 },
  company_permission: { type: Number, default: 0, min: 0 },
  requirement_permission: { type: Number, default: 0, min: 0 },
  call_permission: { type: Number, default: 0, min: 0 },
  property_permission: { type: Number, default: 0, min: 0 },
  other_permission: { type: Number, default: 0, min: 0 },
  user_permission: { type: Number, default: 0, min: 0 },
});

export default mongoose.model("userModel", userSchema);
