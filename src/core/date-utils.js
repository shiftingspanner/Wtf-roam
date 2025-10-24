/**
 * Date utilities for parsing Roam date references
 */

/**
 * Parse a Roam date string like "January 1st, 2024" or "[[January 1st, 2024]]"
 * @param {string} dateStr - Date string from Roam
 * @returns {Date|null} Parsed date or null if invalid
 */
export function parseRoamDate(dateStr) {
  if (!dateStr) return null;

  // Remove [[ ]] if present
  const cleaned = dateStr.replace(/[\[\]]/g, '').trim();

  // Try parsing as standard date format
  const date = new Date(cleaned);
  if (!isNaN(date.getTime())) {
    return date;
  }

  return null;
}

/**
 * Calculate days until a date
 * @param {Date} date - Target date
 * @returns {number} Days until date (negative if past)
 */
export function daysUntil(date) {
  if (!date) return Infinity;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return '';

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const days = daysUntil(date);

  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  if (days < 0) return `${Math.abs(days)} days ago`;
  if (days <= 7) return `In ${days} days`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

/**
 * Get urgency category based on days until deadline
 * @param {number} days - Days until deadline
 * @returns {string} Urgency category
 */
export function getUrgencyCategory(days) {
  if (days < 0) return 'overdue';
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days <= 3) return 'this-week';
  if (days <= 7) return 'next-week';
  return 'future';
}
