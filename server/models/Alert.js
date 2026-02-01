/* ===========================
models/Alert.js
=========================== */
import mongoose from "mongoose";

/*
  USER-DEFINED TRIGGERS
*/
const alertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
    type: { type: String, enum: ["price", "news"], required: true },
    condition: { type: Object, required: true }, // flexible JSON rule
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);


/* ===========================
models/Notification.js
=========================== */
import mongoose from "mongoose";