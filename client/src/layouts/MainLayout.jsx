import TopNav from '../features/Nav/TopNav';
// import SideNav from '../features/Nav/SideNav';
// import RightPanel from '../features/Nav/RightPanel';
import styles from './MainLayout.module.css';

export default function MainLayout({ children }) {
  return (
    <div className={styles.container}>
      <TopNav /> {/* top navbar */}
      <div className={styles.body}>
        {/* <SideNav /> */}
        <main className={styles.mainContent}>{children}</main>
        {/* <RightPanel /> */}
      </div>
    </div>
  );
}