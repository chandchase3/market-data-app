import { useSelector } from 'react-redux';
import TopNav from '../features/Nav/TopNav';
import SideNav from '../features/Nav/SideNav';
import RightPanel from '../features/Nav/RightPanel';
import styles from './MainLayout.module.css';

export default function MainLayout({ children }) {
  const { topNav, sideNav, rightPanel } = useSelector((state) => state.ui);

  return (
    <div className={styles.container}>
      {topNav.visible && <TopNav />}

      <div className={styles.body}>
        {sideNav.visible && <SideNav />}
        <main className={styles.mainContent}>{children}</main>
        {rightPanel.visible && <RightPanel />}
        {/* {rightPanel.visible && <RightPanel />} */}
      </div>
    </div>
  );
}
