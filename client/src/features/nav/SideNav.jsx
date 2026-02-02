import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideNav.module.css';

export default function SideNav() {

  const [collapsed, setCollapsed] = useState(true); // was false before


  return (
    <aside className={`${styles.sideNav} ${collapsed ? styles.collapsed : ''}`}>
      {/* Toggle Button */}
      <button 
        className={styles.toggleBtn} 
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '➡' : '⬅'} {/* simple arrow icon */}
      </button>

      {/* Navigation links */}
      <nav className={styles.navLinks}>
        <NavLink to="/watchlists" className={({isActive}) => isActive ? styles.active : ''}>Watchlists</NavLink>
        <NavLink to="/news" className={({isActive}) => isActive ? styles.active : ''}>News</NavLink>
        <NavLink to="/alerts" className={({isActive}) => isActive ? styles.active : ''}>Alerts</NavLink>
        <NavLink to="/notes" className={({isActive}) => isActive ? styles.active : ''}>Notes</NavLink>
      </nav>
    </aside>
  );
}
