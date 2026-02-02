import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WatchlistCard from './WatchlistCard';
import AddWatchlist from './AddWatchlist';
import { fetchWatchlists, addWatchlist } from './watchlistsSlice';
import styles from './watchlists.module.css';

export default function WatchlistHub() {
  const dispatch = useDispatch();
  const { items: watchlists, loading } = useSelector((state) => state.watchlists);

  useEffect(() => {
    dispatch(fetchWatchlists());
  }, [dispatch]);

  const handleAddWatchlist = (name) => {
    dispatch(addWatchlist(name));
  };

  if (loading) return <p>Loading watchlists...</p>;

  return (
    <div className={styles.container}>
      <AddWatchlist onAdd={handleAddWatchlist} />
      {watchlists.length === 0 ? (
        <p>No watchlists yet.</p>
      ) : (
        watchlists.map((wl) => <WatchlistCard key={wl._id} name={wl.name} />)
      )}
    </div>
  );
}
