import mongoose from "mongoose";

/*
  WATCHLIST SCHEMA
  ----------------
  A watchlist is a USER-OWNED container.
  It groups assets together for a purpose.

  Examples:
  - "Has News Today"
  - "Scalp Trades"
  - "Long-Term HODL"
*/

const watchlistSchema = new mongoose.Schema(
  {
    /*
      Owner of the watchlist.
      Each user only sees their own lists.
    */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /*
      Name shown in the UI.
    */
    name: {
      type: String,
      required: true,
    },

    /*
      Optional description.
      Useful for notes like:
      "Only trade with volume + news"
    */
    description: {
      type: String,
      default: "",
    },

    /*
      Defines what kind of assets this list holds.
      Used for filtering & API logic.
    */
    type: {
      type: String,
      enum: ["stocks", "crypto", "mixed"],
      default: "mixed",
    },

    /*
      Preset list types.
      Examples:
      - "has-news"
      - "day-trades"
      - "alerts"
      This allows future automation.
    */
    presetType: {
      type: String,
      default: null,
    },

    /*
      Optional expiration date.
      Example:
      - "Delete this list after today"
    */
    expiresAt: {
      type: Date,
      default: null,
    },

    /*
      Allows soft-deletion / hiding.
    */
    isArchived: {
      type: Boolean,
      default: false,
    },
  },

  /*
    Adds createdAt & updatedAt
  */
  {
    timestamps: true,
  }
);

export default mongoose.model("Watchlist", watchlistSchema);
