# Deployment Instructions

## Issue

GitHub Pages is currently showing only the README because two workflows are competing:
1. `deploy.yml` - Builds with Vite and deploys `dist/roamflow.js` ✅
2. `jekyll-gh-pages.yml` - Builds with Jekyll (markdown only) ❌

The Jekyll workflow runs last and overwrites the Vite deployment.

## Solution

Follow these steps to fix the deployment:

### Step 1: Delete the Jekyll Workflow

Go to GitHub and delete the conflicting workflow:

1. Visit: https://github.com/shiftingspanner/Wtf-roam/blob/main/.github/workflows/jekyll-gh-pages.yml
2. Click the trash/delete icon (🗑️)
3. Commit directly to main with message: "Remove conflicting Jekyll workflow"

### Step 2: Wait for Deployment

After deleting the Jekyll workflow:

1. Go to: https://github.com/shiftingspanner/Wtf-roam/actions
2. Wait for the "Deploy to GitHub Pages" workflow to run (~2 minutes)
3. Check for green ✓ checkmark

### Step 3: Verify

Once deployed, verify the file is accessible:

```
https://shiftingspanner.github.io/Wtf-roam/roamflow.js
```

You should see JavaScript code, not a 404 error.

### Step 4: Test in Roam

Add the loader snippet from README.md to a Roam page and test the commands.

---

## Alternative: Merge This Branch

The `claude/code-review-011CUSqbG7vxkczFRFGyCg2r` branch includes:
- ✅ `.nojekyll` file to prevent Jekyll processing
- ✅ `test.html` for local testing
- ✅ Does NOT include the Jekyll workflow

**However:** Simply merging this branch won't delete the Jekyll workflow from main.
You still need to manually delete `jekyll-gh-pages.yml` from main after merging.

---

## What's in This Branch

- Modern ES6 modular architecture
- Simplified to TODO/Scheduled/Deadline only
- Vite build system (20KB bundle)
- GitHub Actions deployment
- `.nojekyll` to prevent Jekyll processing
- Local test page

## Next Steps After Deployment Works

1. Test the loader snippet in Roam
2. Use Command Palette commands (Cmd/Ctrl + P):
   - "RoamFlow: Show Dashboard"
   - "RoamFlow: What Should I Do Now?"
3. Iterate on features as needed
