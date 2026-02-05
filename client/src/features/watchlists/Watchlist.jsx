import { useState } from "react";
import { useDispatch } from "react-redux";
import { addWatchlistItem } from "./watchlistsSlice"; // thunk to add item
import styles from "./Watchlist.module.css";

export default function Watchlist({ watchlist }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    const name = input.trim();
    if (!name) return;

    // Dispatch thunk to add item to this watchlist
    console.log(watchlist)
    dispatch(addWatchlistItem({ watchlistId: watchlist._id, name }));
    setInput("");
  };

  return (
    <div className={styles.watchlist}>
      <h3 className={styles.title}>{watchlist.name}</h3>

      {/* Form to add a new watchlist item */}
      <form className={styles.form} onSubmit={handleAddItem}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add new item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Add
        </button>
      </form>

      {/* List of existing items */}
      <ul className={styles.items}>
        {watchlist.items && watchlist.items.length > 0 ? (
          watchlist.items.map((item) => (
            <li key={item._id} className={styles.item}>
              {item.name || item.asset?.symbol || "Untitled Item"}
            </li>
          ))
        ) : (
          <li className={styles.noItem}>No items yet.</li>
        )}
      </ul>
    </div>
  );
}
