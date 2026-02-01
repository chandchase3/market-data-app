import mongoose from "mongoose";

/*
  WATCHLIST ITEM SCHEMA
  ---------------------
  This represents:
  "This asset inside THIS watchlist for THIS user"

  This is where:
  - notes
  - tags
  - sentiment
  - timeframe
  - has-news
  live
*/

const watchlistItemSchema = new mongoose.Schema(
  {
    /*
      Owner of this item.
      Even if assets are shared,
      opinions are NOT.
    */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /*
      Which watchlist this item belongs to.
    */
    watchlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watchlist",
      required: true,
      index: true,
    },

    /*
      Reference to the global Asset.
      This is the shared connection.
    */
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
      index: true,
    },

    /*
      User notes specific to THIS list.
      Example:
      - Bullish for day trade
      - Bearish for swing
    */
    notes: {
      type: String,
      default: "",
    },

    /*
      Flexible tagging system.
      Supports:
      - Preset tags
      - Custom tags
      - Filtering
    */
    tags: [
      {
        type: String,
        index: true,
      },
    ],

    /*
      Trading strategy context.
      Used heavily for filtering.
    */
    strategy: {
      type: String,
      enum: ["scalp", "day", "swing", "long", null],
      default: null,
    },

    /*
      Bullish / Bearish is NOT global.
      It is CONTEXTUAL.
    */
    sentiment: {
      type: String,
      enum: ["bullish", "bearish", "neutral", null],
      default: null,
    },

    /*
      Timeframe context.
      This solves your "news today vs long-term news" problem.
    */
    timeframe: {
      type: String,
      enum: ["today", "this-week", "long-term"],
      default: "today",
    },

    /*
      Boolean flag for filtering.
      This is FAST and cheap.
    */
    hasNews: {
      type: Boolean,
      default: false,
      index: true,
    },

    /*
      When news was last checked.
      Helps with API limits.
    */
    lastNewsCheckedAt: {
      type: Date,
      default: null,
    },

    /*
      Allows temporary disabling.
    */
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  /*
    Adds createdAt & updatedAt
  */
  {
    timestamps: true,
  }
);

/*
  Prevents duplicate items:
  Same user
  Same watchlist
  Same asset
*/
watchlistItemSchema.index(
  { user: 1, watchlist: 1, asset: 1 },
  { unique: true }
);

export default mongoose.model("WatchlistItem", watchlistItemSchema);
