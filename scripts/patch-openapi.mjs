#!/usr/bin/env node
/**
 * patch-openapi.mjs
 *
 * Fetches the public OpenAPI spec from api.galileo.ai and patches the
 * APIKeyHeader security scheme's header name from "Splunk-AO-API-Key" to
 * "Galileo-API-Key" before it's used to generate the API reference docs.
 * This script runs at build time, NOT runtime.
 *
 * Usage: node scripts/patch-openapi.mjs
 */

import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Source and destination
const OPENAPI_URL = 'https://api.galileo.ai/public/v2/openapi.json';
const OUTPUT_PATH = join(__dirname, '../api-reference/openapi.json');

// Security scheme to patch
const SCHEME_NAME = 'APIKeyHeader';
const OLD_HEADER_NAME = 'Splunk-AO-API-Key';
const NEW_HEADER_NAME = 'Galileo-API-Key';

/**
 * Fetches the OpenAPI spec from the upstream URL
 */
async function fetchSpec() {
    let response;
    try {
        response = await fetch(OPENAPI_URL);
    } catch (err) {
        console.error(`❌ Failed to fetch ${OPENAPI_URL}:`, err.message);
        process.exit(1);
    }

    if (!response.ok) {
        console.error(`❌ Failed to fetch ${OPENAPI_URL}: ${response.status} ${response.statusText}`);
        process.exit(1);
    }

    try {
        return await response.json();
    } catch (err) {
        console.error(`❌ Failed to parse OpenAPI spec as JSON:`, err.message);
        process.exit(1);
    }
}

/**
 * Patches the APIKeyHeader security scheme's name in place.
 * Fails loudly if the scheme is missing or has an unexpected value, so an
 * upstream spec change doesn't silently no-op this patch.
 */
function patchSecurityScheme(spec) {
    const scheme = spec?.components?.securitySchemes?.[SCHEME_NAME];

    if (!scheme) {
        console.error(`❌ Could not find components.securitySchemes.${SCHEME_NAME} in the fetched spec`);
        process.exit(1);
    }

    if (scheme.name === NEW_HEADER_NAME) {
        // Already patched upstream (or a re-run) - nothing to do
        return;
    }

    if (scheme.name !== OLD_HEADER_NAME) {
        console.error(
            `❌ components.securitySchemes.${SCHEME_NAME}.name was "${scheme.name}", expected "${OLD_HEADER_NAME}" or "${NEW_HEADER_NAME}". ` +
            `The upstream spec may have changed - update this script.`
        );
        process.exit(1);
    }

    scheme.name = NEW_HEADER_NAME;
}

async function main() {
    const spec = await fetchSpec();

    patchSecurityScheme(spec);

    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

    try {
        writeFileSync(OUTPUT_PATH, JSON.stringify(spec, null, 2), 'utf8');
    } catch (err) {
        console.error(`❌ Failed to write ${OUTPUT_PATH}:`, err.message);
        process.exit(1);
    }

    console.log(`✅ Patched ${SCHEME_NAME}.name to "${NEW_HEADER_NAME}" and wrote ${OUTPUT_PATH}`);
}

main();
