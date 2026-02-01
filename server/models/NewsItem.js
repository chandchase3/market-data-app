/* ===========================
models/NewsItem.js
=========================== */
import mongoose from "mongoose";

/*
  FACTUAL NEWS
  No opinions here.
*/
const newsItemSchema = new mongoose.Schema(
  {
    asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
    headline: { type: String, required: true },
    url: { type: String, required: true },
    source: { type: String },
    publishedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("NewsItem", newsItemSchema);
