import { useState } from 'react';
import styles from './RightPanel.module.css';

export default function RightPanel() {
  // Start collapsed by default
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside className={`${styles.rightPanel} ${collapsed ? styles.collapsed : ''}`}>
      {/* Toggle Button */}
      <button
        className={styles.toggleBtn}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '⬅' : '➡'} {/* arrow indicates collapse/expand */}
      </button>

      {/* Panel Content */}
      {!collapsed && (
        <div className={styles.content}>
          <h4>Quick Actions</h4>
          <ul>
            <li>Recent Alerts</li>
            <li>Market Summary</li>
            <li>Filters / Tags</li>
          </ul>
        </div>
      )}
    </aside>
  );
}
