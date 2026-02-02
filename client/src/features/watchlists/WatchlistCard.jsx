import styles from './watchlists.module.css';

export default function WatchlistCard({ name }) {
  return (
    <div className={styles.item}>
      {name}
      {/* Future: Add buttons for notes, alerts, scan news */}
    </div>
  );
}
