/**
 * Task prioritization based on deadlines and scheduling
 */

import { daysUntil, getUrgencyCategory } from './date-utils.js';

/**
 * Calculate priority score for a task
 * @param {Object} task - Task object with deadline/scheduled
 * @returns {number} Priority score (0-100, higher is more urgent)
 */
export function calculatePriority(task) {
  let score = 0;

  // Deadline urgency (70% of score)
  if (task.deadline) {
    const days = daysUntil(task.deadline);
    const deadlineScore = calculateDeadlineScore(days);
    score += deadlineScore * 0.7;
  }

  // Scheduled date relevance (30% of score)
  if (task.scheduled) {
    const days = daysUntil(task.scheduled);
    const scheduledScore = calculateScheduledScore(days);
    score += scheduledScore * 0.3;
  }

  // If no dates, give it a baseline score
  if (!task.deadline && !task.scheduled) {
    score = 25; // Low priority, but not zero
  }

  return Math.round(score);
}

/**
 * Calculate deadline urgency score
 * @param {number} days - Days until deadline
 * @returns {number} Score 0-100
 */
function calculateDeadlineScore(days) {
  if (days < 0) return 100; // Overdue - maximum priority
  if (days === 0) return 95; // Due today
  if (days === 1) return 85; // Due tomorrow
  if (days <= 3) return 70; // Due this week
  if (days <= 7) return 50; // Due next week
  if (days <= 14) return 30; // Due in 2 weeks
  if (days <= 30) return 15; // Due this month

  return 5; // Future deadline
}

/**
 * Calculate scheduled date relevance score
 * @param {number} days - Days until scheduled date
 * @returns {number} Score 0-100
 */
function calculateScheduledScore(days) {
  if (days < 0) return 20; // Past scheduled date - low priority
  if (days === 0) return 100; // Scheduled today - do it now
  if (days === 1) return 80; // Scheduled tomorrow
  if (days <= 3) return 50; // Scheduled this week
  if (days <= 7) return 30; // Scheduled next week

  return 10; // Scheduled later
}

/**
 * Sort tasks by priority
 * @param {Array} tasks - Array of task objects
 * @returns {Array} Sorted tasks (highest priority first)
 */
export function prioritizeTasks(tasks) {
  return tasks
    .map(task => ({
      ...task,
      priority: calculatePriority(task),
      urgency: getTaskUrgency(task)
    }))
    .sort((a, b) => b.priority - a.priority);
}

/**
 * Get urgency category for a task
 * @param {Object} task - Task object
 * @returns {string} Urgency category
 */
function getTaskUrgency(task) {
  // Prioritize deadline over scheduled
  if (task.deadline) {
    const days = daysUntil(task.deadline);
    return getUrgencyCategory(days);
  }

  if (task.scheduled) {
    const days = daysUntil(task.scheduled);
    return getUrgencyCategory(days);
  }

  return 'unscheduled';
}

/**
 * Get the next task to work on
 * @param {Array} tasks - Array of tasks
 * @returns {Object|null} Highest priority task or null
 */
export function getNextTask(tasks) {
  if (!tasks || tasks.length === 0) return null;

  const prioritized = prioritizeTasks(tasks);
  return prioritized[0];
}

/**
 * Filter tasks by urgency category
 * @param {Array} tasks - Array of tasks
 * @param {string} category - Urgency category
 * @returns {Array} Filtered tasks
 */
export function filterByUrgency(tasks, category) {
  const withUrgency = tasks.map(task => ({
    ...task,
    urgency: getTaskUrgency(task)
  }));

  return withUrgency.filter(task => task.urgency === category);
}
