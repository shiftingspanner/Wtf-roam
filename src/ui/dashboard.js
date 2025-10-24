/**
 * Dashboard UI component
 */

import { formatDate, getUrgencyCategory, daysUntil } from '../core/date-utils.js';
import { prioritizeTasks } from '../core/prioritizer.js';

export class Dashboard {
  constructor() {
    this.panel = null;
    this.tasks = [];
  }

  /**
   * Create and show the dashboard
   * @param {Array} tasks - Array of tasks to display
   */
  show(tasks) {
    this.tasks = prioritizeTasks(tasks);
    this.render();
  }

  /**
   * Hide the dashboard
   */
  hide() {
    if (this.panel) {
      this.panel.remove();
      this.panel = null;
    }
  }

  /**
   * Toggle dashboard visibility
   * @param {Array} tasks - Array of tasks
   */
  toggle(tasks) {
    if (this.panel) {
      this.hide();
    } else {
      this.show(tasks);
    }
  }

  /**
   * Render the dashboard UI
   */
  render() {
    // Remove existing panel if any
    this.hide();

    // Create panel
    this.panel = document.createElement('div');
    this.panel.className = 'roamflow-panel';

    // Header
    const header = this.createHeader();
    this.panel.appendChild(header);

    // Content
    const content = document.createElement('div');
    content.className = 'roamflow-content';

    // Next task section
    if (this.tasks.length > 0) {
      const nextSection = this.createNextTaskSection();
      content.appendChild(nextSection);

      // All tasks section
      const allSection = this.createAllTasksSection();
      content.appendChild(allSection);
    } else {
      content.appendChild(this.createEmptyState());
    }

    this.panel.appendChild(content);

    // Add to page
    document.body.appendChild(this.panel);
  }

  /**
   * Create header with title and close button
   */
  createHeader() {
    const header = document.createElement('div');
    header.className = 'roamflow-header';

    const title = document.createElement('h3');
    title.className = 'roamflow-title';
    title.textContent = 'What To Focus On';

    const closeButton = document.createElement('button');
    closeButton.className = 'roamflow-close';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => this.hide();

    header.appendChild(title);
    header.appendChild(closeButton);

    return header;
  }

  /**
   * Create next task section
   */
  createNextTaskSection() {
    const section = document.createElement('div');
    section.className = 'roamflow-section';
    section.style.background = '#f0f9ff';
    section.style.borderLeft = '4px solid #137cbd';

    const title = document.createElement('h4');
    title.className = 'roamflow-section-title';
    title.textContent = 'Up Next';
    title.style.color = '#137cbd';

    const task = this.tasks[0];
    const taskElement = this.createTaskElement(task, true);

    section.appendChild(title);
    section.appendChild(taskElement);

    return section;
  }

  /**
   * Create all tasks section
   */
  createAllTasksSection() {
    const section = document.createElement('div');
    section.className = 'roamflow-section';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.marginBottom = '12px';

    const title = document.createElement('h4');
    title.className = 'roamflow-section-title';
    title.textContent = `All Tasks (${this.tasks.length})`;
    title.style.margin = '0';

    const refreshButton = document.createElement('button');
    refreshButton.className = 'roamflow-refresh';
    refreshButton.textContent = 'Refresh';
    refreshButton.onclick = () => this.refresh();

    header.appendChild(title);
    header.appendChild(refreshButton);

    const taskList = document.createElement('ul');
    taskList.className = 'roamflow-task-list';

    // Show top 10 tasks
    this.tasks.slice(0, 10).forEach(task => {
      const li = document.createElement('li');
      const taskElement = this.createTaskElement(task, false);
      li.appendChild(taskElement);
      taskList.appendChild(li);
    });

    section.appendChild(header);
    section.appendChild(taskList);

    return section;
  }

  /**
   * Create task element
   * @param {Object} task - Task object
   * @param {boolean} isNext - Is this the next task?
   */
  createTaskElement(task, isNext) {
    const element = document.createElement('div');
    element.className = 'roamflow-task-item';
    if (isNext) {
      element.style.background = 'white';
      element.style.border = '2px solid #137cbd';
    }

    // Make clickable to open in sidebar
    element.onclick = () => this.openTaskInSidebar(task.uid);

    // Task text
    const text = document.createElement('p');
    text.className = 'roamflow-task-text';
    text.textContent = task.text;

    // Metadata
    const meta = document.createElement('div');
    meta.className = 'roamflow-task-meta';

    // Priority score
    const priority = document.createElement('span');
    priority.textContent = `Priority: ${task.priority}`;
    priority.style.fontWeight = '600';
    meta.appendChild(priority);

    // Deadline badge
    if (task.deadline) {
      const badge = this.createUrgencyBadge('Deadline', task.deadline);
      meta.appendChild(badge);
    }

    // Scheduled badge
    if (task.scheduled) {
      const badge = this.createUrgencyBadge('Scheduled', task.scheduled);
      meta.appendChild(badge);
    }

    element.appendChild(text);
    element.appendChild(meta);

    return element;
  }

  /**
   * Create urgency badge
   */
  createUrgencyBadge(label, date) {
    const days = daysUntil(date);
    const urgency = getUrgencyCategory(days);

    const badge = document.createElement('span');
    badge.className = `roamflow-badge roamflow-badge-${urgency}`;
    badge.textContent = `${label}: ${formatDate(date)}`;

    return badge;
  }

  /**
   * Create empty state
   */
  createEmptyState() {
    const empty = document.createElement('div');
    empty.className = 'roamflow-empty';

    const icon = document.createElement('div');
    icon.className = 'roamflow-empty-icon';
    icon.textContent = '✓';

    const text = document.createElement('p');
    text.className = 'roamflow-empty-text';
    text.textContent = 'No tasks found. Create a TODO with Scheduled:: or Deadline:: to get started.';

    empty.appendChild(icon);
    empty.appendChild(text);

    return empty;
  }

  /**
   * Open task in Roam sidebar
   */
  openTaskInSidebar(uid) {
    if (window.roamAlphaAPI) {
      window.roamAlphaAPI.ui.rightSidebar.addWindow({
        window: { type: 'block', 'block-uid': uid }
      });
      window.roamAlphaAPI.ui.rightSidebar.open();
    }
  }

  /**
   * Refresh dashboard
   */
  refresh() {
    // Emit custom event to trigger refresh
    window.dispatchEvent(new CustomEvent('roamflow-refresh'));
  }
}
