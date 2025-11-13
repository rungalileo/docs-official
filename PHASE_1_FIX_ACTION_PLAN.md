# Phase 1 Fix Action Plan

**Created:** November 13, 2025
**PR:** [#479](https://github.com/rungalileo/docs-official/pull/479)
**Current Status:** 4 failing checks, 3 passing
**Priority:** Fix critical issues to unblock Phase 1 validation

## Quick Status Summary

```
✅ PASS: Mintlify Dev Check (build works)
✅ PASS: Mintlify Deployment (preview works)
✅ PASS: Check Snippets Product Folder
❌ FAIL: Check for broken links
❌ FAIL: Markdown Lint
❌ FAIL: Check Card Links
❌ FAIL: Check Spellings with Vale
```

## Fix Order (High to Low Priority)

### 1. Fix Broken Links ⚠️ CRITICAL

**Commands to run:**
```bash
# Check current link references
grep -n "DOCUMENTATION_STYLE_GUIDE" README.md what-is-galileo.mdx

# The link checker may expect different formats
# Try one of these approaches in affected files:
```

**Files to fix:**
- `README.md` - Line with `./DOCUMENTATION_STYLE_GUIDE.md` link
- `what-is-galileo.mdx` - Line with `./DOCUMENTATION_STYLE_GUIDE.md` link

**Solution:** Update link format to what the link checker expects (may need to test different formats or check existing working links for reference).

### 2. Fix Markdown Linting ⚠️ CRITICAL

**Commands to run:**
```bash
# Auto-fix what can be fixed
npm run lint:markdown:fix

# See remaining issues
npm run lint:markdown

# Focus on new/modified files:
# - README.md
# - PHASE_1_TESTING_CHECKLIST.md
# - what-is-galileo.mdx
# - PHASE_1_VALIDATION_STATUS.md
# - PHASE_1_VALIDATION_REPORT.md (this may need fixes too)
```

**Common fixes needed:**
- Remove trailing whitespace
- Fix line length violations (max 120 chars typically)
- Add blank lines before/after headings
- Fix list indentation
- Remove multiple consecutive blank lines

### 3. Fix Card Links ⚠️ HIGH

**File to check:**
- `what-is-galileo.mdx`

**What to verify:**
- All Card `href` attributes point to valid paths
- No typos in paths (e.g., `/get-started/` vs `/getting-started/`)
- Multi-line Card components are properly formatted

**Specific section to review:**
The newly added "Phase 1 Enhancements" section with Card that links to `./DOCUMENTATION_STYLE_GUIDE.md`

### 4. Fix Vale Spelling ⚠️ MEDIUM

**Commands to run:**
```bash
# Run Vale to see issues
vale . --glob='!{sdk-api/**/reference/**/*.*}'

# Common technical terms that may need exceptions:
# - UX, UI, CI/CD, TOC, CSS, JavaScript
# - Mintlify, Lighthouse, Cmd, Ctrl
# - macOS, iOS, Android
```

**Options:**
1. Fix legitimate spelling/grammar errors
2. Add technical terms to Vale exceptions in `.vale.ini`
3. Accept specific Vale suggestions

## Step-by-Step Execution Plan

### Phase A: Quick Wins (15 minutes)

```bash
# Step 1: Auto-fix markdown linting
npm run lint:markdown:fix

# Step 2: Check what's left
npm run lint:markdown

# Step 3: Manually fix any remaining markdown issues
# (Edit files as needed based on linter output)
```

### Phase B: Link Fixes (15 minutes)

```bash
# Step 4: Examine current link format
cat README.md | grep -A2 "DOCUMENTATION_STYLE_GUIDE"

# Step 5: Check how other internal docs are linked
grep -r "\.md" README.md | head -5

# Step 6: Update links to use consistent format
# Edit README.md and what-is-galileo.mdx

# Option 1: Try without .md extension
# Option 2: Try with /docs/ prefix
# Option 3: Check existing working doc links for pattern
```

### Phase C: Card Link Fix (10 minutes)

```bash
# Step 7: Open what-is-galileo.mdx
# Step 8: Find the Phase 1 Enhancements Card
# Step 9: Verify href path matches other working Cards
# Step 10: Fix if needed
```

### Phase D: Vale Spelling (15 minutes)

```bash
# Step 11: Run Vale
vale . --glob='!{sdk-api/**/reference/**/*.*}' 2>&1 | tee vale-output.txt

# Step 12: Review output, categorize issues
# Step 13: Fix legitimate errors
# Step 14: Add technical terms to exceptions if valid
```

### Phase E: Test and Push (10 minutes)

```bash
# Step 15: Stage all fixes
git add .

# Step 16: Commit with clear message
git commit -m "fix: resolve link validation, linting, and spelling issues

- Fix broken links to DOCUMENTATION_STYLE_GUIDE.md
- Resolve markdown linting violations
- Fix Card component link validation
- Address Vale spelling concerns"

# Step 17: Push to test branch
git push origin test/phase1-cicd-validation

# Step 18: Monitor PR checks
gh pr checks 479

# Step 19: Wait for checks to complete (~2-3 minutes)
# Step 20: Verify all checks now pass
```

## Expected Timeline

- **Phase A (Markdown linting):** 15 minutes
- **Phase B (Link fixes):** 15 minutes
- **Phase C (Card links):** 10 minutes
- **Phase D (Vale spelling):** 15 minutes
- **Phase E (Test and push):** 10 minutes

**Total Estimated Time:** 65 minutes (~1 hour)

## Success Criteria

After fixes are applied and pushed, all checks should pass:

```
✅ Check for broken links
✅ Markdown Lint
✅ Check Card Links
✅ Check Spellings with Vale
✅ Mintlify Dev Check
✅ Mintlify Deployment
✅ Check Snippets Product Folder
```

**Target:** 7/7 checks passing (100% success rate)

## Fallback Plan

If certain checks continue to fail after fixes:

### For Link Checker Issues:
- Check `.github/workflows/` for link checker configuration
- Review which link formats work in existing docs
- May need to update link checker rules or exclusions

### For Markdown Lint Issues:
- Review `.markdownlint.jsonc` and `.markdownlint-cli2.jsonc` for rules
- Some rules may need to be relaxed for documentation files
- Can add specific file exclusions if needed

### For Vale Issues:
- Review `.vale.ini` configuration
- Add vocabulary files in `.github/styles/` if needed
- Can disable specific rules for technical documentation

### For Card Link Issues:
- Check if this is a new validation rule
- Review existing Card components that pass validation
- May need to update Card formatting to match working examples

## Post-Fix Actions

Once all checks pass:

1. **Manual Testing:**
   - Visit Mintlify preview URL
   - Test keyboard shortcuts (Cmd/Ctrl+K)
   - Verify sticky TOC works
   - Test code copy buttons
   - Check mobile responsiveness

2. **Document Lessons:**
   - Update PHASE_1_VALIDATION_REPORT.md with fixes applied
   - Note any configuration changes made
   - Document any new patterns discovered

3. **Prepare for Merge:**
   - Create final summary of Phase 1 completion
   - Update PHASE_1_VALIDATION_STATUS.md
   - Ready PR #479 for review and potential merge

## Notes

- The core Phase 1 implementation (custom CSS/JS, docs.json config) is working correctly
- These are quality/validation issues, not fundamental implementation problems
- Once fixed, Phase 1 will be complete and validated
- Ready to proceed to Phase 2 (AI-Powered Search & Navigation)

---

**Action Plan Created:** November 13, 2025
**Ready to Execute:** Yes
**Next Step:** Start with Phase A (Markdown linting auto-fix)
