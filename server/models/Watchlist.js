/* ===========================
models/Watchlist.js
=========================== */
import mongoose from "mongoose";

/*
  WATCHLIST:
  A named collection of assets owned by a user
*/
const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Watchlist", watchlistSchema);
