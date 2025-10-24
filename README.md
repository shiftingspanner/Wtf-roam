# WTF-Roam (What To Focus On)

A simplified workflow optimization tool for Roam Research that helps you prioritize tasks based on deadlines and scheduled dates.

## Features

- 🎯 **Smart Prioritization**: Automatically scores tasks based on deadlines and scheduled dates
- 📊 **Dashboard View**: See your top priority tasks at a glance
- ⚡ **Quick Actions**: "What should I do now?" command palette integration
- 🔄 **Real-time Updates**: Detects TODOs from your current page
- 🎨 **Clean UI**: Minimal, non-intrusive interface

## Installation

### Option 1: Load from GitHub Pages (Recommended)

1. Create a new page in your Roam graph (e.g., "roam/js/roamflow")
2. Add a code block with type `{{[[roam/js]]}}`
3. Paste the following code:

```javascript
(function() {
  'use strict';

  if (window.RoamFlowLoaded) {
    console.log('RoamFlow already loaded');
    return;
  }

  console.log('Loading RoamFlow...');

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

  document.head.appendChild(script);
})();
```

4. Navigate to any page and open the Command Palette (Cmd/Ctrl + P)
5. Look for "RoamFlow" commands

### Option 2: Build from Source

```bash
# Clone the repository
git clone https://github.com/shiftingspanner/Wtf-roam.git
cd Wtf-roam

# Install dependencies
npm install

# Build
npm run build

# Output will be in ./dist/roamflow.js
```

## Usage

### Task Format

Create TODOs with scheduling metadata:

```
{{[[TODO]]}} Review legal brief
  Deadline:: [[December 25th, 2024]]
  Scheduled:: [[December 20th, 2024]]
```

### Command Palette

Open the Command Palette (Cmd/Ctrl + P) and use:

- **RoamFlow: Show Dashboard** - Opens the task dashboard
- **RoamFlow: What Should I Do Now?** - Shows your highest priority task
- **RoamFlow: Refresh Tasks** - Manually refresh the task list

### Dashboard

The dashboard shows:
- **Up Next**: Your highest priority task
- **All Tasks**: Top 10 tasks sorted by priority
- **Priority Score**: Calculated based on deadlines and scheduled dates
- **Urgency Badges**: Visual indicators for overdue, today, tomorrow, etc.

Click any task to open it in the Roam sidebar.

## How Priority is Calculated

Tasks are scored 0-100 based on:

1. **Deadline Urgency (70%)**:
   - Overdue: 100 points
   - Due today: 95 points
   - Due tomorrow: 85 points
   - Due this week: 70 points
   - Due next week: 50 points
   - Due later: 5-30 points

2. **Scheduled Date (30%)**:
   - Scheduled today: 100 points
   - Scheduled tomorrow: 80 points
   - Scheduled this week: 50 points
   - Scheduled next week: 30 points

Tasks without dates get a baseline score of 25.

## Development

```bash
# Install dependencies
npm install

# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

Built with modern JavaScript:
- **Core Modules**: Task detection, date parsing, prioritization
- **UI**: Vanilla JS with Blueprint.js styling (Roam-native)
- **Build**: Vite for fast bundling
- **Hosting**: GitHub Pages

## Roadmap

- [ ] Analytics view (task completion trends)
- [ ] Custom priority weights
- [ ] Integration with Roam attributes
- [ ] Export task reports
- [ ] Mobile responsive improvements

## Contributing

This is a personal workflow tool, but suggestions and improvements are welcome! Open an issue or PR.

## License

MIT

## Credits

Built for legal professionals using Roam Research to manage complex workflows.
