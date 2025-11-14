# Google Docs Conversion Instructions

This directory contains deployment documentation in multiple formats for easy import into Google Docs.

## Files Available

### Markdown Files (Recommended for Google Docs)
- `deployment-questionnaire.md` - Comprehensive deployment planning questionnaire
- `master-deployment-checklist.md` - Complete deployment checklist with 100+ items

### HTML Files (Alternative Method)
- `deployment-questionnaire.html` - HTML version with inline CSS
- `master-deployment-checklist.html` - HTML version with inline CSS

## Method 1: Using gdoc_down (Recommended)

### Why gdoc_down?

The [gdoc_down](https://github.com/KarrLab/gdoc_down) tool provides the most accurate conversion from Markdown to Google Docs, preserving:
- ✓ Proper checkbox formatting
- ✓ Table structures
- ✓ Heading hierarchies
- ✓ Lists and formatting
- ✓ Links and styling

### Installation

#### Prerequisites
- Python 3.7 or higher
- pip package manager

#### Install gdoc_down

```bash
pip install gdoc_down
```

### Usage

#### Step 1: Convert Markdown to DOCX

Convert the questionnaire:
```bash
gdoc_down deployment-questionnaire.md deployment-questionnaire.docx
```

Convert the master checklist:
```bash
gdoc_down master-deployment-checklist.md master-deployment-checklist.docx
```

#### Step 2: Upload to Google Docs

1. Go to [Google Drive](https://drive.google.com)
2. Click "New" → "File upload"
3. Select the `.docx` file you just created
4. Once uploaded, double-click the file to open it
5. Google Docs will automatically convert it to native format
6. Click "File" → "Save as Google Docs" (if not auto-converted)

### Advanced Options

#### Custom Styling

```bash
gdoc_down deployment-questionnaire.md \
  deployment-questionnaire.docx \
  --heading-style "Heading 1" \
  --list-style "List"
```

#### Include Images (if any added in future)

```bash
gdoc_down master-deployment-checklist.md \
  master-deployment-checklist.docx \
  --image-dir ./images
```

## Method 2: Direct HTML Import (Alternative)

If you prefer not to use gdoc_down:

1. Open [Google Docs](https://docs.google.com)
2. Create a new blank document
3. Click "File" → "Open"
4. Select the "Upload" tab
5. Upload the HTML file (`deployment-questionnaire.html` or `master-deployment-checklist.html`)
6. Google Docs will convert the HTML

**Note:** HTML conversion may have formatting inconsistencies. The gdoc_down method (Method 1) is recommended for best results.

## Method 3: Copy-Paste from Markdown

For quick testing:

1. Open the `.md` file in a Markdown preview tool (VS Code, GitHub, etc.)
2. Copy the rendered content
3. Paste into Google Docs

**Note:** Checkboxes will paste as text and need manual formatting.

## Troubleshooting

### Issue: Checkboxes not rendering properly

**Solution:** After import, use Google Docs' built-in checkbox feature:
1. Select checkbox text (e.g., "- [ ]")
2. Click "Format" → "Bullets & numbering" → "List options" → "List type: Checkbox"

### Issue: gdoc_down not found after installation

**Solution:** Ensure Python's scripts directory is in your PATH:
```bash
# Check Python scripts location
python -m site --user-base

# Add to PATH (macOS/Linux)
export PATH="$PATH:$(python -m site --user-base)/bin"

# Add to PATH (Windows)
# Add the Scripts directory to your system PATH environment variable
```

### Issue: Tables not formatting correctly

**Solution:** In Google Docs:
1. Select the table
2. Click "Format" → "Table" → "Table properties"
3. Adjust borders, padding, and alignment as needed

### Issue: Missing dependencies for gdoc_down

**Solution:** Install required dependencies:
```bash
pip install --upgrade pip
pip install gdoc_down[all]
```

## Post-Conversion Customization

After importing to Google Docs, you can:

### 1. Add Your Branding
- Insert company logo in header
- Customize colors to match brand guidelines
- Update footer with company information

### 2. Enable Collaboration
- Click "Share" button
- Add team members with appropriate permissions
- Set up comment notifications

### 3. Create a Template
- Make a copy for reuse: "File" → "Make a copy"
- Save to "Template gallery" for easy access
- Share template link with deployment teams

### 4. Convert Checkboxes to Interactive
1. Select all checkbox items
2. Format → Bullets & numbering → List options
3. Choose "Checkbox" list type
4. Now clickable in Google Docs!

## File Descriptions

### deployment-questionnaire.md
- **Size:** ~13 sections, 60+ questions
- **Use case:** Initial deployment planning and requirements gathering
- **Target audience:** Project leads, technical architects, stakeholders
- **Estimated completion time:** 1-2 hours

### master-deployment-checklist.md
- **Size:** 5 phases, 100+ checklist items
- **Use case:** End-to-end deployment tracking from planning to go-live
- **Target audience:** Deployment teams, project managers, ops teams
- **Estimated completion time:** Ongoing throughout deployment

## Best Practices

### For Questionnaire
1. Complete all sections before deployment planning begins
2. Share with stakeholders for input
3. Attach to deployment proposal documents
4. Reference during architecture reviews

### For Master Checklist
1. Create a copy for each deployment
2. Assign team members to specific sections
3. Update regularly during deployment
4. Use comment feature for notes and blockers
5. Review in weekly project status meetings

## Support

For issues with:
- **gdoc_down tool:** Visit [KarrLab/gdoc_down](https://github.com/KarrLab/gdoc_down/issues)
- **Document content:** Contact Galileo Support at support@galileo.ai
- **Deployment questions:** Refer to [Galileo Deployment Docs](https://docs.galileo.ai/deployment-docs)

## Version History

### Version 1.0 (2025)
- Initial release
- Deployment questionnaire with 13 sections
- Master checklist with 5 deployment phases
- Support for gdoc_down, HTML, and direct import

---

## Quick Start Commands

For the impatient, here's the fastest way to get both documents into Google Docs:

```bash
# Install gdoc_down (one time)
pip install gdoc_down

# Convert both files
cd deployment-docs/exports
gdoc_down deployment-questionnaire.md deployment-questionnaire.docx
gdoc_down master-deployment-checklist.md master-deployment-checklist.docx

# Now upload the .docx files to Google Drive and open in Google Docs
```

Happy deploying! 🚀
