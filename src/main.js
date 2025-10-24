/**
 * RoamFlow - What To Focus On
 * Main entry point
 */

import { detectTasks } from './core/task-detector.js';
import { getNextTask, prioritizeTasks } from './core/prioritizer.js';
import { Dashboard } from './ui/dashboard.js';
import { injectStyles } from './ui/styles.js';

class RoamFlow {
  constructor() {
    this.dashboard = new Dashboard();
    this.initialized = false;
  }

  /**
   * Initialize RoamFlow
   */
  async init() {
    if (this.initialized) {
      console.log('RoamFlow already initialized');
      return;
    }

    console.log('Initializing RoamFlow...');

    // Inject styles
    injectStyles();

    // Set up command palette commands
    this.setupCommands();

    // Listen for refresh events
    window.addEventListener('roamflow-refresh', () => {
      this.showDashboard();
    });

    this.initialized = true;
    console.log('RoamFlow initialized successfully');
  }

  /**
   * Set up command palette commands
   */
  setupCommands() {
    if (!window.roamAlphaAPI) {
      console.warn('Roam API not available, commands not registered');
      return;
    }

    // Command: Show Dashboard
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: 'RoamFlow: Show Dashboard',
      callback: () => this.showDashboard()
    });

    // Command: What should I do now?
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: 'RoamFlow: What Should I Do Now?',
      callback: () => this.whatShouldIDoNow()
    });

    // Command: Refresh Tasks
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: 'RoamFlow: Refresh Tasks',
      callback: () => this.showDashboard()
    });

    console.log('RoamFlow commands registered');
  }

  /**
   * Show the dashboard
   */
  async showDashboard() {
    console.log('Detecting tasks...');
    const tasks = detectTasks();
    console.log(`Found ${tasks.length} tasks`);

    if (tasks.length === 0) {
      alert('No TODO items found on this page. Create a TODO with Scheduled:: or Deadline:: dates.');
      return;
    }

    this.dashboard.show(tasks);
  }

  /**
   * Show "What should I do now?" dialog
   */
  async whatShouldIDoNow() {
    console.log('Finding next task...');
    const tasks = detectTasks();

    if (tasks.length === 0) {
      alert('No TODO items found. Create a TODO with Scheduled:: or Deadline:: dates.');
      return;
    }

    const nextTask = getNextTask(tasks);

    if (!nextTask) {
      alert('No tasks found.');
      return;
    }

    // Create a simple dialog
    const message = `
📋 Next Task:

${nextTask.text}

Priority Score: ${nextTask.priority}
${nextTask.deadline ? `Deadline: ${nextTask.deadline.toLocaleDateString()}` : ''}
${nextTask.scheduled ? `Scheduled: ${nextTask.scheduled.toLocaleDateString()}` : ''}

Click OK to open in sidebar.
    `.trim();

    if (confirm(message)) {
      this.openInSidebar(nextTask.uid);
    }
  }

  /**
   * Open block in sidebar
   */
  openInSidebar(uid) {
    if (window.roamAlphaAPI) {
      window.roamAlphaAPI.ui.rightSidebar.addWindow({
        window: { type: 'block', 'block-uid': uid }
      });
      window.roamAlphaAPI.ui.rightSidebar.open();
    }
  }

  /**
   * Get all tasks (for external access)
   */
  getTasks() {
    return detectTasks();
  }

  /**
   * Get prioritized tasks (for external access)
   */
  getPrioritizedTasks() {
    const tasks = detectTasks();
    return prioritizeTasks(tasks);
  }
}

// Initialize on load
const roamFlow = new RoamFlow();

// Wait for DOM and Roam to be ready
function waitForRoam() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => roamFlow.init(), 1000);
    });
  } else {
    // DOM already loaded
    setTimeout(() => roamFlow.init(), 1000);
  }
}

waitForRoam();

// Export for external access
window.RoamFlow = roamFlow;

export default roamFlow;
