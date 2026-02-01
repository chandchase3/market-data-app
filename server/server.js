/* ===========================
server.js
=========================== */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import assetRoutes from "./routes/assets.js";
import watchlistRoutes from "./routes/watchlists.js";
import watchlistItemRoutes from "./routes/watchlistItems.js";

dotenv.config();

const app = express();

/*
  MIDDLEWARE
*/
app.use(cors());
app.use(express.json());

/*
  ROUTES
*/
app.use("/assets", assetRoutes);
app.use("/watchlists", watchlistRoutes);
app.use("/watchlist-items", watchlistItemRoutes);

/*
  DATABASE
*/
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
});

/*
  SERVER START
*/
app.listen(5000, () => {
  console.log("Server running on port 5000");
});