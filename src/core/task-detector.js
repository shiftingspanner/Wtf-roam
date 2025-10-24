/**
 * Task detection from Roam DOM
 */

import { parseRoamDate } from './date-utils.js';

/**
 * Find all TODO items in the current page
 * @returns {Array} Array of task objects
 */
export function detectTasks() {
  const tasks = [];

  // Find all TODO checkboxes (both formats)
  const todoElements = [
    ...document.querySelectorAll('.check-container:has(input[type="checkbox"]:not(:checked))'),
    ...document.querySelectorAll('.rm-block__input:has(.bp3-control.bp3-checkbox:not(.checked))')
  ];

  todoElements.forEach(element => {
    const block = element.closest('.rm-block');
    if (!block) return;

    const task = extractTaskFromBlock(block);
    if (task) {
      tasks.push(task);
    }
  });

  return tasks;
}

/**
 * Extract task information from a Roam block
 * @param {HTMLElement} block - Roam block element
 * @returns {Object|null} Task object or null
 */
function extractTaskFromBlock(block) {
  const blockId = block.getAttribute('id');
  if (!blockId) return null;

  // Extract UID from block ID
  const uid = blockId.replace('block-input-', '');

  // Get the text content
  const textElement = block.querySelector('.rm-block__input');
  if (!textElement) return null;

  const text = textElement.textContent.trim();
  if (!text) return null;

  // Extract metadata from child blocks
  const metadata = extractMetadata(block);

  return {
    uid,
    text,
    scheduled: metadata.scheduled,
    deadline: metadata.deadline,
    blockRef: uid
  };
}

/**
 * Extract metadata from block and its children
 * @param {HTMLElement} block - Roam block element
 * @returns {Object} Metadata object
 */
function extractMetadata(block) {
  const metadata = {
    scheduled: null,
    deadline: null
  };

  // Look for Scheduled:: and Deadline:: in the block itself
  const blockText = block.textContent;

  // Extract Scheduled date
  const scheduledMatch = blockText.match(/Scheduled::\s*\[\[([^\]]+)\]\]/i);
  if (scheduledMatch) {
    metadata.scheduled = parseRoamDate(scheduledMatch[1]);
  }

  // Extract Deadline date
  const deadlineMatch = blockText.match(/Deadline::\s*\[\[([^\]]+)\]\]/i);
  if (deadlineMatch) {
    metadata.deadline = parseRoamDate(deadlineMatch[1]);
  }

  // Also check child blocks
  const childBlocks = block.querySelectorAll('.rm-block-children > .rm-block');
  childBlocks.forEach(child => {
    const childText = child.textContent;

    if (!metadata.scheduled) {
      const schedMatch = childText.match(/Scheduled::\s*\[\[([^\]]+)\]\]/i);
      if (schedMatch) {
        metadata.scheduled = parseRoamDate(schedMatch[1]);
      }
    }

    if (!metadata.deadline) {
      const deadMatch = childText.match(/Deadline::\s*\[\[([^\]]+)\]\]/i);
      if (deadMatch) {
        metadata.deadline = parseRoamDate(deadMatch[1]);
      }
    }
  });

  return metadata;
}

/**
 * Get task by UID using Roam API (fallback)
 * @param {string} uid - Block UID
 * @returns {Object|null} Task object or null
 */
export async function getTaskByUID(uid) {
  if (!window.roamAlphaAPI) return null;

  try {
    const block = await window.roamAlphaAPI.q(`
      [:find (pull ?b [:block/string :block/uid {:block/children ...}])
       :where [?b :block/uid "${uid}"]]
    `);

    if (!block || !block[0]) return null;

    const blockData = block[0][0];
    const text = blockData[':block/string'] || '';

    // Extract metadata
    const scheduled = extractDateFromString(text, 'Scheduled');
    const deadline = extractDateFromString(text, 'Deadline');

    return {
      uid,
      text,
      scheduled,
      deadline,
      blockRef: uid
    };
  } catch (error) {
    console.error('Error fetching task by UID:', error);
    return null;
  }
}

/**
 * Extract date from string for a given attribute
 * @param {string} text - Text to search
 * @param {string} attr - Attribute name
 * @returns {Date|null} Parsed date or null
 */
function extractDateFromString(text, attr) {
  const match = text.match(new RegExp(`${attr}::\\s*\\[\\[([^\\]]+)\\]\\]`, 'i'));
  if (match) {
    return parseRoamDate(match[1]);
  }
  return null;
}
