import { useSelector } from 'react-redux';
import { getActiveWatchlist } from './watchlistsSlice';
import styles from './WatchlistHub.module.css';

export default function WatchlistHub() {
  const watchlist = useSelector(getActiveWatchlist);

  if (!watchlist) {
    return <div className={styles.empty}>No active watchlist</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{watchlist.name}</h2>

      <ul className={styles.list}>
        {watchlist.symbols.map((symbol) => (
          <li key={symbol} className={styles.item}>
            {symbol}
          </li>
        ))}
      </ul>
    </div>
  );
}
