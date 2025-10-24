/**
 * UI styles for RoamFlow
 */

export const styles = {
  panel: `
    position: fixed;
    top: 60px;
    right: 20px;
    width: 450px;
    max-height: 80vh;
    background: white;
    border: 1px solid #d3d8de;
    border-radius: 6px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  `,
  header: `
    padding: 12px 16px;
    background: #f5f7f9;
    border-bottom: 1px solid #d3d8de;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  title: `
    font-size: 16px;
    font-weight: 600;
    color: #1c2127;
    margin: 0;
  `,
  closeButton: `
    background: none;
    border: none;
    color: #5f6b7c;
    cursor: pointer;
    font-size: 20px;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
  `,
  closeButtonHover: `
    background: #e1e5ea;
  `,
  content: `
    overflow-y: auto;
    flex: 1;
  `,
  section: `
    padding: 16px;
    border-bottom: 1px solid #e1e5ea;
  `,
  sectionTitle: `
    font-size: 14px;
    font-weight: 600;
    color: #5f6b7c;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,
  taskList: `
    list-style: none;
    padding: 0;
    margin: 0;
  `,
  taskItem: `
    padding: 10px;
    margin-bottom: 8px;
    background: #f5f7f9;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  `,
  taskItemHover: `
    background: #e1e5ea;
  `,
  taskText: `
    font-size: 14px;
    color: #1c2127;
    margin: 0 0 6px 0;
  `,
  taskMeta: `
    font-size: 12px;
    color: #5f6b7c;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  `,
  badge: `
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
  `,
  badgeOverdue: `
    background: #fa5252;
    color: white;
  `,
  badgeToday: `
    background: #fd7e14;
    color: white;
  `,
  badgeTomorrow: `
    background: #fab005;
    color: white;
  `,
  badgeWeek: `
    background: #51cf66;
    color: white;
  `,
  badgeFuture: `
    background: #e1e5ea;
    color: #5f6b7c;
  `,
  emptyState: `
    padding: 40px 16px;
    text-align: center;
    color: #5f6b7c;
  `,
  emptyIcon: `
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.3;
  `,
  emptyText: `
    font-size: 14px;
    margin: 0;
  `,
  button: `
    background: #137cbd;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.2s;
  `,
  buttonHover: `
    background: #106ba3;
  `,
  refreshButton: `
    background: #f5f7f9;
    color: #5f6b7c;
    border: 1px solid #d3d8de;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    transition: background 0.2s;
  `
};

/**
 * Inject global styles into document
 */
export function injectStyles() {
  if (document.getElementById('roamflow-styles')) return;

  const styleSheet = document.createElement('style');
  styleSheet.id = 'roamflow-styles';
  styleSheet.textContent = `
    .roamflow-panel { ${styles.panel} }
    .roamflow-header { ${styles.header} }
    .roamflow-title { ${styles.title} }
    .roamflow-close { ${styles.closeButton} }
    .roamflow-close:hover { ${styles.closeButtonHover} }
    .roamflow-content { ${styles.content} }
    .roamflow-section { ${styles.section} }
    .roamflow-section-title { ${styles.sectionTitle} }
    .roamflow-task-list { ${styles.taskList} }
    .roamflow-task-item { ${styles.taskItem} }
    .roamflow-task-item:hover { ${styles.taskItemHover} }
    .roamflow-task-text { ${styles.taskText} }
    .roamflow-task-meta { ${styles.taskMeta} }
    .roamflow-badge { ${styles.badge} }
    .roamflow-badge-overdue { ${styles.badgeOverdue} }
    .roamflow-badge-today { ${styles.badgeToday} }
    .roamflow-badge-tomorrow { ${styles.badgeTomorrow} }
    .roamflow-badge-week { ${styles.badgeWeek} }
    .roamflow-badge-future { ${styles.badgeFuture} }
    .roamflow-empty { ${styles.emptyState} }
    .roamflow-empty-icon { ${styles.emptyIcon} }
    .roamflow-empty-text { ${styles.emptyText} }
    .roamflow-button { ${styles.button} }
    .roamflow-button:hover { ${styles.buttonHover} }
    .roamflow-refresh { ${styles.refreshButton} }
  `;

  document.head.appendChild(styleSheet);
}
