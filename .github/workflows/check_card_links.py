#!/usr/bin/env python3
"""
Link checker for Mintlify <Card> components.

Scans all .mdx/.md/.html files for <Card ... href="..."> attributes and validates:
- External links (http/https): simple HEAD check (fallback to GET) with timeout.
- Internal links (starting with "/" or relative paths): verify file exists in repo at the mapped path.

Outputs any broken links with file path and line number, then exits non-zero if any are found.

Usage:
  python .github/workflows/check_card_links.py [--root <repo_root>] [--timeout 10]
"""

from __future__ import annotations

import argparse
import concurrent.futures
import os
import re
import sys
import time
import random
from dataclasses import dataclass
from typing import List, Tuple
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError


CARD_HREF_REGEX = re.compile(r"<Card\b[^>]*?\bhref\s*=\s*(['\"])(?P<href>[^'\"]+)\1", re.IGNORECASE | re.DOTALL)
MDX_COMMENT_BLOCK = re.compile(r"\{/\*.*?\*/\}", re.DOTALL)


@dataclass
class BrokenLink:
    file: str
    line: int
    href: str
    reason: str
    kind: str  # "external" or "internal"


def find_files(root: str) -> List[str]:
    exts = {".mdx", ".md", ".html"}
    results: List[str] = []
    for dirpath, dirnames, filenames in os.walk(root):
        # Skip hidden folders (e.g., .github, .git, .vscode)
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]
        for name in filenames:
            if os.path.splitext(name)[1].lower() in exts:
                results.append(os.path.join(dirpath, name))
    return results


def strip_mdx_comments(text: str) -> str:
    # Remove MDX comment blocks of the form {/* ... */}
    return MDX_COMMENT_BLOCK.sub("", text)


def extract_card_hrefs(file_path: str) -> List[Tuple[str, int]]:
    """Return list of (href, line_number) for each Card href in file."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except UnicodeDecodeError:
        # Fallback to latin-1 if needed
        with open(file_path, "r", encoding="latin-1") as f:
            content = f.read()

    processed = strip_mdx_comments(content)
    hrefs: List[Tuple[str, int]] = []
    for m in CARD_HREF_REGEX.finditer(processed):
        href = m.group("href").strip()
        # Compute original line number from start index in processed text; approximate mapping to original
        start_idx = m.start()
        window_start = max(0, start_idx - 200)
        window_end = min(len(content), start_idx + 200)
        window = content[window_start:window_end]
        href_quote = m.group(1)
        needle = f"href={href_quote}{href}{href_quote}"
        local_idx = window.find(needle)
        if local_idx != -1:
            absolute_idx = window_start + local_idx
            line_num = content.count("\n", 0, absolute_idx) + 1
        else:
            # Fallback: count lines in processed content
            line_num = processed.count("\n", 0, start_idx) + 1

        hrefs.append((href, line_num))
    return hrefs


def is_external_url(href: str) -> bool:
    return href.startswith("http://") or href.startswith("https://") or href.startswith("mailto:")


def check_external(href: str, timeout: float, max_retries: int = 5, backoff_base: float = 0.5) -> Tuple[bool, str]:
    """Return (ok, reason). Retries up to max_retries with exponential backoff."""
    # Allow mailto links to pass without checking
    if href.startswith("mailto:"):
        return True, "mailto link"

    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; LinkChecker/1.0; +https://github.com/)",
        "Accept": "*/*",
        "Connection": "close",
    }
    last_reason = ""
    for attempt in range(max_retries):
        try:
            req = Request(href, method="HEAD", headers=headers)
            with urlopen(req, timeout=timeout) as resp:
                code = getattr(resp, "status", getattr(resp, "code", 0))
                if 200 <= code < 400:
                    return True, f"HTTP {code}"
                if code in (405,):
                    pass
                else:
                    return False, f"HTTP {code}"
        except HTTPError as e:
            if e.code not in (403, 405):
                last_reason = f"HTTPError {e.code}: {e.reason}"
                break
        except URLError as e:
            last_reason = f"URLError: {getattr(e, 'reason', e)}"
        except (OSError, ValueError, TimeoutError) as e:
            last_reason = f"Error: {e}"

        # Fallback to GET for HEAD 403/405 or explicit 405 above
        try:
            headers_get = dict(headers)
            headers_get["Range"] = "bytes=0-0"
            req = Request(href, method="GET", headers=headers_get)
            with urlopen(req, timeout=timeout) as resp:
                code = getattr(resp, "status", getattr(resp, "code", 0))
                if 200 <= code < 400:
                    return True, f"HTTP {code}"
                last_reason = f"HTTP {code}"
        except (HTTPError, URLError, OSError, ValueError, TimeoutError) as e:
            last_reason = f"GET failed: {e}"

        # Exponential backoff before next retry
        sleep_time = backoff_base * (2 ** attempt) + random.uniform(0, 0.2)
        time.sleep(sleep_time)
    return False, f"Failed after {max_retries} retries: {last_reason}"


def normalize_internal_path(href: str) -> str:
    # Remove fragment and query
    parts = urlsplit(href)
    path = parts.path
    if path.startswith("/"):
        path = path[1:]
    return path


def exists_internal(root: str, href: str) -> bool:
    path = normalize_internal_path(href)
    # Direct file path (e.g., images/foo.png)
    candidates = [
        os.path.join(root, path),
        os.path.join(root, f"{path}.mdx"),
        os.path.join(root, f"{path}.md"),
        os.path.join(root, path, "index.mdx"),
        os.path.join(root, path, "index.md"),
    ]
    for c in candidates:
        if os.path.exists(c):
            return True
    return False


def main(argv: List[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Check <Card href> links in a Mintlify docs repo.")
    parser.add_argument("--root", default=os.getcwd(), help="Path to repo root (default: cwd)")
    parser.add_argument("--timeout", type=float, default=10.0, help="HTTP timeout seconds (default: 10)")
    parser.add_argument("--max-workers", type=int, default=12, help="Max concurrent HTTP checks (default: 12)")
    parser.add_argument("--verbose", action="store_true", help="Verbose output")
    parser.add_argument("--github-annotations", action="store_true", help="Emit GitHub Actions annotations (::error) for broken links")
    parser.add_argument("--summary-file", default=None, help="Write a markdown summary of broken links to this file")
    args = parser.parse_args(argv)

    repo_root = os.path.abspath(args.root)
    files = find_files(repo_root)
    broken: List[BrokenLink] = []
    externals_to_check: List[Tuple[str, str, int]] = []  # (href, file, line)

    for file_path in files:
        hrefs = extract_card_hrefs(file_path)
        if not hrefs:
            continue
        for href, line in hrefs:
            if is_external_url(href):
                externals_to_check.append((href, file_path, line))
            else:
                ok = exists_internal(repo_root, href)
                if not ok:
                    broken.append(BrokenLink(file=file_path, line=line, href=href, reason="File not found", kind="internal"))
                else:
                    # If the internal href points directly to a .mdx file, mark as broken
                    parsed_path = urlsplit(href).path or ""
                    if parsed_path.lower().endswith(".mdx"):
                        broken.append(
                            BrokenLink(
                                file=file_path,
                                line=line,
                                href=href,
                                reason="Link points directly to a .mdx file; use a permalink or non-.mdx path",
                                kind="internal",
                            )
                        )

    # Deduplicate external URLs for efficiency but keep all occurrences for reporting
    # We'll check each occurrence individually so we can record per-file/line
    start = time.time()
    if externals_to_check:
        if args.verbose:
            print(f"Checking {len(externals_to_check)} external links...")
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.max_workers) as executor:
            fut_to_item = {
                executor.submit(check_external, href, args.timeout, 5): (href, file_path, line)
                for href, file_path, line in externals_to_check
            }
            for fut in concurrent.futures.as_completed(fut_to_item):
                href, file_path, line = fut_to_item[fut]
                try:
                    ok, reason = fut.result()
                except (HTTPError, URLError, OSError, ValueError, TimeoutError) as e:
                    ok, reason = False, f"Error: {e}"
                if not ok:
                    broken.append(BrokenLink(file=file_path, line=line, href=href, reason=reason, kind="external"))
    dur = time.time() - start

    if broken:
        broken_sorted = sorted(broken, key=lambda x: (x.file, x.line, x.href))
        print("Broken links found:")
        for b in broken_sorted:
            rel_file = os.path.relpath(b.file, repo_root)
            print(f"- {rel_file}:{b.line}: [{b.kind}] {b.href} -> {b.reason}")

        # Emit GitHub annotations for inline PR reporting
        if args.github_annotations:
            for b in broken_sorted:
                rel_file = os.path.relpath(b.file, repo_root)
                # GitHub Actions annotation format
                # ::error file=app.js,line=10,col=15::Something went wrong
                print(f"::error file={rel_file},line={b.line}::[{b.kind}] {b.href} -> {b.reason}")

        # Optionally write a markdown summary for PR comment
        if args.summary_file:
            try:
                lines = [
                    "# Broken Card links report\n",
                    f"Checked external links in {dur:.1f}s.\n\n",
                ]
                current_file = None
                for b in broken_sorted:
                    rel_file = os.path.relpath(b.file, repo_root)
                    if rel_file != current_file:
                        if current_file is not None:
                            lines.append("\n")
                        lines.append(f"## {rel_file}\n\n")
                        current_file = rel_file
                    lines.append(f"- Line {b.line}: `{b.href}` ({b.kind}) — {b.reason}\n")
                with open(args.summary_file, "w", encoding="utf-8") as f:
                    f.writelines(lines)
            except (OSError, IOError) as e:
                print(f"Warning: failed to write summary file '{args.summary_file}': {e}")

        print(f"Total broken: {len(broken)} | Checked external links in {dur:.1f}s")
        return 1
    else:
        # Success path: optionally emit a GitHub notice and write a summary file
        success_msg = f"✅ No broken Card links found. Checked external links in {dur:.1f}s"
        if args.github_annotations:
            print(f"::notice::{success_msg}")
        if args.summary_file:
            try:
                with open(args.summary_file, "w", encoding="utf-8") as f:
                    f.write("# Card links check\n\n")
                    f.write(success_msg + "\n")
            except (OSError, IOError) as e:
                print(f"Warning: failed to write summary file '{args.summary_file}': {e}")
        print(success_msg)
        return 0


if __name__ == "__main__":
    sys.exit(main())
