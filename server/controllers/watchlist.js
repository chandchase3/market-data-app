/* ===========================
controllers/watchlist.js
=========================== */
import Watchlist from "../models/Watchlist.js";

/*
  GET all watchlists for the logged-in user
*/
export const getWatchlists = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const lists = await Watchlist.find({ user: req.user._id });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
  CREATE a new watchlist for the logged-in user
*/
export const createWatchlist = async (req, res) => {
  try {
    const { name, description, type } = req.body;

    const watchlist = await Watchlist.create({
      user: req.user._id,      // automatically tied to logged-in user
      name,
      description: description || "",
      type: type || "mixed",   // default type is mixed
    });

    res.status(201).json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
