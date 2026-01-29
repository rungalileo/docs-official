#!/usr/bin/env node
/**
 * generate-errors-data.mjs
 * 
 * Reads errors.yaml and injects the errors array directly into ErrorCatalogTable.jsx.
 * This script runs at build time, NOT runtime.
 * 
 * Usage: node scripts/generate-errors-data.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const YAML_PATH = join(__dirname, '../references/faqs/errors.yaml');
const COMPONENT_PATH = join(__dirname, '../snippets/components/ErrorCatalogTable.jsx');

// Markers for code injection
const BEGIN_MARKER = '// BEGIN GENERATED ERRORS';
const END_MARKER = '// END GENERATED ERRORS';

// Required fields for each error entry
const REQUIRED_FIELDS = [
    'error_code',
    'error_type',
    'error_group',
    'severity',
    'default_message',
    'user_action'
];

// Fields to include in the output (customer-facing fields only)
const OUTPUT_FIELDS = [
    'error_code',
    'error_type',
    'error_group',
    'severity',
    'default_message',
    'user_action',
    'retriable',
    'http_status_code'
];

/**
 * Validates that an error entry has all required fields
 */
function validateEntry(entry, index) {
    const errors = [];
    
    for (const field of REQUIRED_FIELDS) {
        if (entry[field] === undefined || entry[field] === null || entry[field] === '') {
            errors.push(`Missing required field '${field}'`);
        }
    }
    
    // Validate error_code is a number
    if (typeof entry.error_code !== 'number') {
        errors.push(`error_code must be a number, got ${typeof entry.error_code}`);
    }
    
    // Validate severity is one of the allowed values
    const validSeverities = ['low', 'medium', 'high', 'critical'];
    if (entry.severity && !validSeverities.includes(entry.severity.toLowerCase())) {
        errors.push(`Invalid severity '${entry.severity}'. Must be one of: ${validSeverities.join(', ')}`);
    }
    
    if (errors.length > 0) {
        console.error(`\n❌ Validation errors for entry ${index + 1} (error_code: ${entry.error_code || 'unknown'}):`);
        errors.forEach(e => console.error(`   - ${e}`));
        return false;
    }
    
    return true;
}

/**
 * Picks only the fields we want in the output
 */
function pickOutputFields(entry) {
    const result = {};
    for (const field of OUTPUT_FIELDS) {
        if (entry[field] !== undefined) {
            result[field] = entry[field];
        }
    }
    // Ensure retriable has a default value
    if (result.retriable === undefined) {
        result.retriable = false;
    }
    return result;
}

/**
 * Generates the inline errors block to inject between markers
 */
function generateErrorsBlock(errors) {
    const jsonArray = JSON.stringify(errors, null, 2);
    // Indent each line by 2 spaces for proper JSX formatting
    const indentedArray = jsonArray.split('\n').map(line => '  ' + line).join('\n');
    return `// BEGIN GENERATED ERRORS\n  // AUTO-GENERATED - DO NOT EDIT DIRECTLY\n  // Generated from errors.yaml by scripts/generate-errors-data.mjs\n  // Run "npm run gen:errors" to regenerate\n  const errors =${indentedArray.slice(2)};\n  // END GENERATED ERRORS`;
}

/**
 * Injects the errors block into the component file between markers
 */
function injectIntoComponent(errorsBlock) {
    let componentContent;
    try {
        componentContent = readFileSync(COMPONENT_PATH, 'utf8');
        // console.log(`✓ Read ${COMPONENT_PATH}`);
    } catch (err) {
        console.error(`❌ Failed to read ${COMPONENT_PATH}:`, err.message);
        process.exit(1);
    }

    const beginIndex = componentContent.indexOf(BEGIN_MARKER);
    const endIndex = componentContent.indexOf(END_MARKER);

    if (beginIndex === -1) {
        console.error(`❌ Could not find "${BEGIN_MARKER}" in ${COMPONENT_PATH}`);
        process.exit(1);
    }

    if (endIndex === -1) {
        console.error(`❌ Could not find "${END_MARKER}" in ${COMPONENT_PATH}`);
        process.exit(1);
    }

    if (beginIndex >= endIndex) {
        console.error(`❌ Markers are in wrong order in ${COMPONENT_PATH}`);
        process.exit(1);
    }

    // Replace content between markers (inclusive of markers)
    const before = componentContent.slice(0, beginIndex);
    const after = componentContent.slice(endIndex + END_MARKER.length);
    const newContent = before + errorsBlock + after;

    return newContent;
}

function main() {
    // console.log('📦 Injecting errors from errors.yaml into ErrorCatalogTable.jsx...\n');
    
    // Read YAML file
    let yamlContent;
    try {
        yamlContent = readFileSync(YAML_PATH, 'utf8');
        // console.log(`✓ Read ${YAML_PATH}`);
    } catch (err) {
        console.error(`❌ Failed to read ${YAML_PATH}:`, err.message);
        process.exit(1);
    }
    
    // Parse YAML
    let entries;
    try {
        entries = yaml.load(yamlContent);
        // console.log(`✓ Parsed ${entries.length} error entries`);
    } catch (err) {
        console.error('❌ Failed to parse YAML:', err.message);
        process.exit(1);
    }
    
    // Validate all entries
    let hasErrors = false;
    for (let i = 0; i < entries.length; i++) {
        if (!validateEntry(entries[i], i)) {
            hasErrors = true;
        }
    }
    
    if (hasErrors) {
        console.error('\n❌ Validation failed. Fix the errors above and try again.');
        process.exit(1);
    }
    
    // console.log('✓ All entries validated');
    
    // Check for duplicate error codes
    const seenCodes = new Set();
    const duplicates = [];
    for (const entry of entries) {
        if (seenCodes.has(entry.error_code)) {
            duplicates.push(entry.error_code);
        }
        seenCodes.add(entry.error_code);
    }
    
    if (duplicates.length > 0) {
        console.error(`\n❌ Duplicate error codes found: ${duplicates.join(', ')}`);
        process.exit(1);
    }
    
    // console.log('✓ No duplicate error codes');
    
    // Pick only output fields and sort by error_code
    const outputErrors = entries
        .map(pickOutputFields)
        .sort((a, b) => a.error_code - b.error_code);
    
    // Generate the errors block
    const errorsBlock = generateErrorsBlock(outputErrors);
    
    // Inject into component file
    const newComponentContent = injectIntoComponent(errorsBlock);
    
    // Write updated component file
    try {
        writeFileSync(COMPONENT_PATH, newComponentContent, 'utf8');
        // console.log(`\n✅ Injected ${outputErrors.length} errors into ${COMPONENT_PATH}`);
    } catch (err) {
        console.error(`❌ Failed to write ${COMPONENT_PATH}:`, err.message);
        process.exit(1);
    }
    
    // Summary by group
    const byGroup = outputErrors.reduce((acc, e) => {
        acc[e.error_group] = (acc[e.error_group] || 0) + 1;
        return acc;
    }, {});
    
    // console.log('\n📊 Errors by group:');
    Object.entries(byGroup).sort().forEach(([group, count]) => {
        // console.log(`   ${group}: ${count}`);
    });
}

main();
