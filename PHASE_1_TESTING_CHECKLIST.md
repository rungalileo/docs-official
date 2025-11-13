# Phase 1 Testing & Validation Checklist

This document provides a comprehensive testing checklist for all Phase 1 UX enhancements and CI/CD pipeline features.

## 🚀 CI/CD Pipeline Testing

### Prerequisites
- [ ] GitHub repository access with permissions to create branches and PRs
- [ ] Understanding of GitHub Actions workflow

### Test Scenarios

#### 1. Markdown Linting
- [ ] Create test branch with intentional markdown errors
- [ ] Push changes and verify workflow runs
- [ ] Confirm markdown-lint job catches formatting issues
- [ ] Fix issues and verify job passes on re-run

**Test Commands:**
```bash
git checkout -b test/markdown-lint-validation
echo "# Test Header\n\nBad formatting  " >> test-doc.mdx  # Trailing spaces
git add test-doc.mdx
git commit -m "test: markdown linting with errors"
git push origin test/markdown-lint-validation
```

#### 2. Link Validation
- [ ] Add broken internal link to a test file
- [ ] Add broken external link to a test file
- [ ] Push changes and verify link-check job runs
- [ ] Review link-check-report.json artifact
- [ ] Fix links and verify job passes

**Test Commands:**
```bash
git checkout -b test/link-validation
echo "[Broken Link](/non-existent-page.mdx)" >> test-doc.mdx
git add test-doc.mdx
git commit -m "test: link validation with broken links"
git push origin test/link-validation
```

#### 3. Build Verification
- [ ] Verify build-check job runs on all PRs
- [ ] Confirm Mintlify builds successfully with custom assets
- [ ] Test with syntax errors in docs.json
- [ ] Test with missing custom files

#### 4. Performance Testing (Lighthouse CI)
- [ ] Verify performance-check job runs on PRs only
- [ ] Review Lighthouse scores in job output
- [ ] Confirm accessibility score meets 95+ target
- [ ] Confirm performance score meets 90+ target
- [ ] Review any warnings or recommendations

#### 5. Preview Deployment
- [ ] Configure MINTLIFY_API_KEY secret in repository settings
- [ ] Create PR and verify preview-deploy job attempts deployment
- [ ] Verify preview URL is generated (once API key configured)
- [ ] Test preview site functionality

#### 6. Status Summary
- [ ] Verify status-summary job runs after all other jobs
- [ ] Check summary output in job logs
- [ ] Confirm it runs even when previous jobs fail

### Expected Results

| Job | Expected Behavior | Success Criteria |
|-----|------------------|------------------|
| markdown-lint | Lints changed files | No formatting errors |
| link-check | Validates all links | All links return 200/valid |
| performance-check | Runs Lighthouse | Score ≥90 (perf), ≥95 (a11y) |
| build-check | Builds with Mintlify | Build succeeds, no errors |
| preview-deploy | Deploys preview | Preview URL generated |
| status-summary | Summarizes results | All jobs reported |

---

## 🎨 UX Enhancements Testing

### Device & Browser Matrix
Test on the following combinations:
- [ ] Chrome (latest) - Desktop macOS
- [ ] Chrome (latest) - Desktop Windows
- [ ] Safari (latest) - Desktop macOS
- [ ] Firefox (latest) - Desktop
- [ ] Chrome - Mobile iOS
- [ ] Safari - Mobile iOS
- [ ] Chrome - Mobile Android
- [ ] Edge (latest) - Desktop Windows

### 1. Search Hotkey (Cmd/Ctrl+K)

**Desktop Testing:**
- [ ] Press Cmd+K (macOS) or Ctrl+K (Windows/Linux)
- [ ] Verify search input receives focus immediately
- [ ] Verify search dialog/overlay opens (if applicable)
- [ ] Test while focus is on different elements (links, buttons, text)
- [ ] Verify default browser behavior is prevented (no bookmark dialog)

**Known Issues to Check:**
- [ ] Hotkey works on all pages, not just homepage
- [ ] Works with both command key variations (left/right Cmd/Ctrl)
- [ ] Doesn't conflict with existing Mintlify shortcuts

**Test Pages:**
- Homepage (`/`)
- Getting Started page
- Deep nested page (e.g., SDK reference)

---

### 2. Sticky Table of Contents

**Visual Verification:**
- [ ] TOC is visible and sticky when scrolling
- [ ] TOC stays positioned at `top: 80px` (below header)
- [ ] Progress indicator bar at top of TOC updates while scrolling
- [ ] Progress bar width accurately reflects scroll position (0-100%)

**Active Section Highlighting:**
- [ ] Current section is highlighted in TOC
- [ ] Highlight updates automatically as you scroll
- [ ] Only one section is highlighted at a time
- [ ] Bottom sections highlight when near page end

**Reading Time:**
- [ ] Reading time estimate appears at top of TOC
- [ ] Time is reasonable (based on ~200 WPM)
- [ ] Format is clear: "X min read" or "X mins read"

**Smooth Scroll:**
- [ ] Clicking TOC link smoothly scrolls to section
- [ ] Scroll animation is smooth, not jarring
- [ ] Target section is properly aligned at top
- [ ] Works for all heading levels (H2, H3, H4)

**Mobile Behavior:**
- [ ] TOC behavior is appropriate on mobile (may hide on small screens)
- [ ] No horizontal overflow issues
- [ ] Touch scrolling works smoothly

**Test Pages:**
- Long documentation page with multiple sections
- Page with nested headings (H2, H3, H4)
- Short page (verify TOC handles gracefully)

---

### 3. Enhanced Code Copy Buttons

**Visual Elements:**
- [ ] Copy button appears on hover over code blocks
- [ ] Button shows language badge (e.g., "JavaScript", "Python", "Bash")
- [ ] Button styling is consistent and visible
- [ ] Hover states work correctly
- [ ] Copy icon is clear and recognizable

**Copy Functionality:**
- [ ] Clicking button copies code to clipboard
- [ ] "Copied!" feedback message appears briefly
- [ ] Message disappears after ~2 seconds
- [ ] Feedback animation is smooth
- [ ] Actual clipboard content matches code block content

**Language Detection:**
- [ ] JavaScript code blocks show "JavaScript" badge
- [ ] Python code blocks show "Python" badge
- [ ] Bash/shell code blocks show "Bash" badge
- [ ] TypeScript code blocks show "TypeScript" badge
- [ ] Generic code blocks show "Code" or detected language

**Clipboard API:**
- [ ] Test in modern browsers (Chrome, Safari, Firefox)
- [ ] Verify HTTPS requirement for Clipboard API
- [ ] Fallback works if Clipboard API unavailable
- [ ] No console errors

**Mobile Testing:**
- [ ] Copy button tap target is at least 44x44px
- [ ] Button is easily tappable on touch screens
- [ ] Haptic feedback works (if available)
- [ ] Clipboard copy works on mobile browsers

**Edge Cases:**
- [ ] Very long code blocks (scrollable)
- [ ] Code blocks with special characters
- [ ] Consecutive copy operations
- [ ] Multiple code blocks on same page

**Test Pages:**
- SDK examples with multiple languages
- Quick start guides with code snippets
- API reference with code samples

---

### 4. Collapsible Sections

**Basic Functionality:**
- [ ] Sections with `data-collapsible="true"` are collapsible
- [ ] Click/tap toggles expand/collapse
- [ ] Smooth animation when opening/closing
- [ ] Icon/indicator shows current state (expanded/collapsed)

**State Management:**
- [ ] Default state (expanded vs collapsed) works correctly
- [ ] State persists during same session if expected
- [ ] Multiple collapsible sections work independently

**Keyboard Accessibility:**
- [ ] Can navigate to collapsible headers with Tab
- [ ] Enter or Space key toggles state
- [ ] Focus is visible and clear
- [ ] Screen reader announces state changes

**Nested Collapsibles:**
- [ ] Parent/child collapsibles work independently
- [ ] No z-index or overflow issues
- [ ] Animations don't conflict

**Mobile:**
- [ ] Tap targets are sufficient (44x44px minimum)
- [ ] Touch gestures work smoothly
- [ ] No accidental triggers

---

### 5. Enhanced Breadcrumbs

**Visual Verification:**
- [ ] Breadcrumbs appear at expected location
- [ ] Path is accurate and complete
- [ ] Separator symbols display correctly
- [ ] Hover states work on links

**Contextual Suggestions:**
- [ ] "Suggested next steps" appear on appropriate pages
- [ ] Suggestions are relevant to current page
- [ ] Suggestion links work correctly
- [ ] Card styling is consistent and attractive

**Navigation:**
- [ ] All breadcrumb links are clickable
- [ ] Links navigate to correct pages
- [ ] Current page is styled differently (not a link)
- [ ] Hierarchy is logical

**Responsive Design:**
- [ ] Breadcrumbs wrap appropriately on narrow screens
- [ ] No horizontal overflow
- [ ] Truncation works for very long paths
- [ ] Mobile view is readable and usable

**Test Pages:**
- Homepage (may not show breadcrumbs)
- Top-level category page (1-2 levels)
- Deep nested page (3-4+ levels)
- SDK reference pages

---

### 6. Print Styles

**Print Preview Testing:**
- [ ] Page layout is clean and professional
- [ ] Headers and footers are appropriate
- [ ] Navigation elements are hidden
- [ ] TOC is handled appropriately (show/hide)
- [ ] Code blocks are readable and properly formatted

**Page Breaks:**
- [ ] No awkward breaks mid-section
- [ ] Headings stay with following content
- [ ] Code blocks avoid breaking across pages
- [ ] Images and figures stay with captions

**Formatting:**
- [ ] Font sizes are appropriate for print
- [ ] Line heights and spacing are comfortable
- [ ] Colors work in grayscale (if printer is B&W)
- [ ] Links show URLs or are distinguishable

**Test Print Quality:**
- [ ] Print to PDF and verify quality
- [ ] Test actual printer output
- [ ] Test on different paper sizes (Letter, A4)

**Test Pages:**
- Long tutorial with code examples
- API reference documentation
- Conceptual documentation with diagrams

---

### 7. Accessibility Testing

**Keyboard Navigation:**
- [ ] All interactive elements are reachable with Tab
- [ ] Tab order is logical and intuitive
- [ ] Shift+Tab works for reverse navigation
- [ ] Focus indicators are visible and clear (3px outline minimum)
- [ ] No keyboard traps

**Skip Links:**
- [ ] Skip to main content link appears on Tab focus
- [ ] Skip link actually skips navigation
- [ ] Skip link is styled clearly
- [ ] Works with assistive technologies

**Screen Reader Testing:**
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Test with NVDA or JAWS (Windows)
- [ ] Test with TalkBack (Android)
- [ ] All headings are announced correctly
- [ ] Links have descriptive text
- [ ] Code blocks are announced properly
- [ ] Dynamic content updates are announced

**ARIA Labels:**
- [ ] Buttons have appropriate aria-labels
- [ ] Landmarks are properly defined
- [ ] Live regions work for dynamic updates
- [ ] Hidden content is properly marked

**Color Contrast:**
- [ ] Text meets WCAG AA standards (4.5:1 normal, 3:1 large)
- [ ] Interactive elements meet contrast requirements
- [ ] Focus indicators are sufficiently visible
- [ ] Test with browser color contrast tools

**Focus Management:**
- [ ] Focus is managed properly after interactions
- [ ] Modal dialogs trap focus appropriately
- [ ] Focus returns to trigger element after closing
- [ ] Skip links work correctly

**Automated Testing:**
- [ ] Run axe DevTools browser extension
- [ ] Run Lighthouse accessibility audit (target: 95+)
- [ ] Run WAVE browser extension
- [ ] Fix any reported issues

---

### 8. Performance Testing

**Page Load:**
- [ ] Initial page load is fast (<3 seconds)
- [ ] Custom CSS loads without blocking
- [ ] Custom JS loads asynchronously
- [ ] No visible layout shifts (CLS < 0.1)

**Scroll Performance:**
- [ ] Smooth scrolling throughout page
- [ ] No jank when updating TOC progress
- [ ] Sticky elements don't cause performance issues
- [ ] Tested on lower-end devices

**JavaScript Performance:**
- [ ] No console errors
- [ ] No memory leaks with extended use
- [ ] RequestAnimationFrame used appropriately
- [ ] Debouncing/throttling works for scroll events

**Network:**
- [ ] Custom assets are cached properly
- [ ] File sizes are reasonable (<50KB per file)
- [ ] No unnecessary requests
- [ ] Test on throttled connection (3G simulation)

---

### 9. Cross-Browser Compatibility

Test all features in each browser:

**Chrome (Latest):**
- [ ] All features work
- [ ] No console errors
- [ ] Layout is correct
- [ ] Performance is good

**Safari (Latest):**
- [ ] All features work
- [ ] Webkit-specific styles applied
- [ ] No layout issues
- [ ] Touch events work on trackpad

**Firefox (Latest):**
- [ ] All features work
- [ ] No console errors
- [ ] Scroll behavior correct
- [ ] Focus styles work

**Edge (Latest):**
- [ ] All features work
- [ ] No compatibility issues
- [ ] Layout matches other browsers

**Mobile Browsers:**
- [ ] iOS Safari works correctly
- [ ] Android Chrome works correctly
- [ ] Touch interactions smooth
- [ ] No mobile-specific bugs

---

### 10. Error Handling & Edge Cases

**Network Errors:**
- [ ] Graceful degradation if custom assets fail to load
- [ ] Page is still functional without custom JS
- [ ] Basic styling maintained without custom CSS

**JavaScript Disabled:**
- [ ] Core documentation is readable
- [ ] Navigation still works
- [ ] Progressive enhancement verified

**Slow Connections:**
- [ ] Page loads and displays content progressively
- [ ] No timeout errors
- [ ] Skeleton screens or loading states (if applicable)

**Long Content:**
- [ ] Very long pages handle correctly
- [ ] TOC with 50+ items works
- [ ] Memory usage stays reasonable

**Empty States:**
- [ ] Pages without TOC handle gracefully
- [ ] Pages without code blocks work fine
- [ ] No console errors on minimal pages

---

## 📊 Testing Results Template

Use this template to document testing results:

```markdown
## Test Session: [Date]
**Tester:** [Name]
**Environment:** [Browser, OS, Device]

### Features Tested:
- [ ] Search Hotkey
- [ ] Sticky TOC
- [ ] Code Copy
- [ ] Collapsible Sections
- [ ] Breadcrumbs
- [ ] Print Styles
- [ ] Accessibility
- [ ] Performance

### Issues Found:
1. **Issue:** [Description]
   - **Severity:** Critical/High/Medium/Low
   - **Steps to Reproduce:** [Steps]
   - **Expected:** [Expected behavior]
   - **Actual:** [Actual behavior]
   - **Screenshots:** [Links if applicable]

2. [Additional issues...]

### Overall Assessment:
- **Pass/Fail:** [Status]
- **Notes:** [Any additional observations]
```

---

## 🎯 Success Criteria

Phase 1 is considered successfully validated when:

- [ ] All CI/CD jobs run without errors on test PRs
- [ ] All UX enhancements work on desktop (Chrome, Safari, Firefox)
- [ ] All features work on mobile (iOS Safari, Android Chrome)
- [ ] Lighthouse accessibility score ≥ 95
- [ ] Lighthouse performance score ≥ 90
- [ ] No critical or high-severity bugs found
- [ ] No console errors on any tested page
- [ ] WCAG 2.1 AA compliance verified
- [ ] All keyboard navigation paths work correctly
- [ ] Print output is professional and readable

---

## 📝 Next Steps After Validation

Once Phase 1 testing is complete:

1. **Document Results:**
   - Create PHASE_1_VALIDATION_REPORT.md
   - List all issues found and their resolutions
   - Include screenshots and metrics

2. **Address Issues:**
   - Fix any critical or high-severity bugs
   - Document workarounds for known limitations
   - Update documentation as needed

3. **Prepare for Phase 2:**
   - Review Phase 2 requirements (AI-Powered Search)
   - Evaluate search provider options (Algolia vs others)
   - Plan implementation timeline

4. **Team Communication:**
   - Share validation results with stakeholders
   - Get approval to proceed to Phase 2
   - Schedule Phase 2 kickoff meeting
