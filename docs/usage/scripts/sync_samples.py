#!/usr/bin/env python3
"""Copies code samples from the libraries into the usage docs, and checks they haven't drifted.

A fenced code block in `docs/usage/docs/**/*.mdx` whose first line is

    // sample: <path>#<region>

is a copy of a region of a source file in this repository (the path is relative to the repository root, so it names a
file in `kotlin-lib/` or `dart-lib/`). The region sits between `// region <name>` and `// endregion` lines in that
file, and the block holds its lines with the common indentation removed.

The Kotlin samples live in `kotlin-lib/sample/docs`, a module CI compiles (and whose tests CI runs), and in the sample
app; the Dart ones live in the example app and in each package's `example/`. So a sample that no longer compiles fails
the library's build, and one that changed fails here.

    python3 docs/usage/scripts/sync_samples.py           # rewrites every block from its source
    python3 docs/usage/scripts/sync_samples.py --check   # exits 1 when a block differs from its source
"""
import re
import sys
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DOCS = ROOT / 'docs' / 'usage' / 'docs'
BLOCK = re.compile(r'^(?P<fence>`{3,})(?P<lang>[a-z]*)[^\n]*\n(?P<marker>// sample: (?P<path>[^#\n]+)#(?P<name>[\w-]+))\n(?P<body>.*?)^(?P=fence)[ \t]*$',
                   re.S | re.M)


def region(path: Path, name: str) -> str:
    lines = path.read_text().split('\n')
    start = next((i for i, l in enumerate(lines) if re.search(rf'//\s*region {re.escape(name)}\s*$', l)), None)
    if start is None:
        raise SystemExit(f'{path.relative_to(ROOT)}: no "// region {name}"')
    end = next((i for i in range(start + 1, len(lines)) if re.search(r'//\s*endregion\s*$', lines[i])), None)
    if end is None:
        raise SystemExit(f'{path.relative_to(ROOT)}: "// region {name}" is never closed')
    body = textwrap.dedent('\n'.join(lines[start + 1:end])).strip('\n')
    return '\n'.join(l.rstrip() for l in body.split('\n'))


def main(check: bool) -> int:
    stale = []
    count = 0
    for page in sorted(DOCS.rglob('*.mdx')) + sorted(DOCS.rglob('*.md')):
        text = page.read_text()

        def fill(m):
            nonlocal count
            count += 1
            source = ROOT / m['path']
            if not source.exists():
                raise SystemExit(f'{page.relative_to(ROOT)}: sample file not found: {m["path"]}')
            fresh = region(source, m['name'])
            if m['body'].rstrip('\n') != fresh:
                stale.append(f'{page.relative_to(ROOT)}: {m["path"]}#{m["name"]}')
            return f'{m["fence"]}{m["lang"]}\n{m["marker"]}\n{fresh}\n{m["fence"]}'

        new = BLOCK.sub(fill, text)
        if new != text and not check:
            page.write_text(new)
    if check:
        for s in stale:
            print('out of date:', s)
        print(f'{count} sample blocks checked, {len(stale)} out of date')
        return 1 if stale else 0
    print(f'{count} sample blocks synced, {len(stale)} changed')
    return 0


if __name__ == '__main__':
    sys.exit(main('--check' in sys.argv))
