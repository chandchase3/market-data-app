import mongoose from "mongoose";

/*
  ASSET SCHEMA
  -------------
  This represents a REAL market instrument.
  It is global and shared across all users.

  Examples:
  - BTC (crypto)
  - DOGE (crypto)
  - AAPL (stock)
*/

const assetSchema = new mongoose.Schema(
  {
    /*
      Symbol of the asset.
      - BTC, DOGE, AAPL, TSLA, etc
      - Uppercase ensures consistency
      - Indexed for fast searching
    */
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      index: true,
    },

    /*
      Human-readable name.
      Example:
      - Bitcoin
      - Dogecoin
      - Apple Inc.
    */
    name: {
      type: String,
      required: true,
    },

    /*
      Asset type.
      VERY IMPORTANT because:
      - Stocks and crypto use different APIs
      - Different market hours
      - Different news sources
    */
    type: {
      type: String,
      enum: ["crypto", "stock"],
      required: true,
      index: true,
    },

    /*
      Exchange where this asset is primarily traded.
      - Kraken for crypto
      - NASDAQ / NYSE later for stocks
      - Nullable because not all assets need this yet
    */
    exchange: {
      type: String,
      default: null,
    },

    /*
      Allows us to "disable" an asset
      without deleting it.
      (Important for historical data & alerts)
    */
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  /*
    Automatically adds:
    - createdAt
    - updatedAt

    This is VERY important for:
    - cache invalidation
    - syncing market/news data
  */
  {
    timestamps: true,
  }
);

/*
  UNIQUE INDEX
  -------------
  Ensures:
  - BTC (crypto) can exist
  - BTC (stock) could exist
  - BUT duplicates are prevented

  This prevents accidental duplication
  when multiple users search the same asset.
*/
assetSchema.index({ symbol: 1, type: 1 }, { unique: true });

export default mongoose.model("Asset", assetSchema);
