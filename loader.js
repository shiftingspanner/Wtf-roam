/**
 * RoamFlow Loader
 *
 * Copy this code into a {{[[roam/js]]}} code block in your Roam graph
 * to load RoamFlow from GitHub Pages.
 */

(function() {
  'use strict';

  // Prevent double-loading
  if (window.RoamFlowLoaded) {
    console.log('RoamFlow already loaded');
    return;
  }

  console.log('Loading RoamFlow...');

  // Create script element
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://shiftingspanner.github.io/Wtf-roam/roamflow.js';

  script.onload = () => {
    console.log('RoamFlow loaded successfully');
    window.RoamFlowLoaded = true;
  };

  script.onerror = (error) => {
    console.error('Failed to load RoamFlow:', error);
  };

  // Add to page
  document.head.appendChild(script);
})();
