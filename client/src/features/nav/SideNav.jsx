import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideNavCollapse } from '../ui/uiSlice';
import { ChevronRight } from 'lucide-react';
import styles from './SideNav.module.css';

export default function SideNav() {
  const dispatch = useDispatch();
  const { collapsed, items } = useSelector((state) => state.ui.sideNav);

  return (
    <aside className={`${styles.sideNav} ${collapsed ? styles.collapsed : ''}`}>
      <button
        className={`${styles.toggleBtn} ${collapsed ? styles.toggleCollapsed : ''}`}
        onClick={() => dispatch(toggleSideNavCollapse())}
        aria-label="Toggle side navigation"
      >
        <ChevronRight
          size={24}
          className={`${styles.reversedIcon} ${collapsed ? '' : styles.open}`}
        />
      </button>

      {!collapsed && (
        <nav className={styles.navLinks}>
          {items.watchlists && <NavLink to="/watchlists">Watchlists</NavLink>}
          {items.news && <NavLink to="/news">News</NavLink>}
          {items.alerts && <NavLink to="/alerts">Alerts</NavLink>}
          {items.notes && <NavLink to="/notes">Notes</NavLink>}
        </nav>
      )}
    </aside>
  );
}
