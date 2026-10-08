---
sidebar_label: Report a bug
title: How to report a bug
---

Well‑written bug reports help us fix issues faster. Before filing, please:

- Search existing issues and discussions to avoid duplicates.
- Check whether the bug belongs to a specific submodule (kotlin-lib or dart-lib) or to the docs sites.
- Try the latest main branch if possible.

What to include
- Summary: a clear, concise title and short description of the problem.
- Environment: OS, toolchain versions (Kotlin/JDK or Dart/Flutter), package versions, and any relevant hardware.
- Steps to reproduce: numbered, minimal steps. Include sample code/config if needed.
- Expected vs actual behavior: what you thought would happen and what actually happened (with logs/screenshots if helpful).
- Additional context: links to related issues/PRs, workarounds tried, or hypothesis about the root cause.

Where to file
- Kotlin issues → open in the root repo and scope to kotlin-lib/ or use the upstream repo https://github.com/srctool/sinew-kotlin
- Dart issues → open in the root repo and scope to dart-lib/ or use the upstream repo https://github.com/srctool/sinew-dart
- Docs issues → open in the root repo under docs/internal/ (contributor docs) or docs/usage/ (usage docs)

Security or sensitive reports
- Do not open a public issue for sensitive matters.
- Email contact@srctool.com with details; we will respond within 72 hours.

Template

Title
Bug: brief description

Body
- Affected area: kotlin-lib | dart-lib | docs
- Version/commit: `<hash or tag>`
- Environment: `<OS, versions>`
- Steps to reproduce:
  1. ...
  2. ...
- Expected behavior: ...
- Actual behavior: ...
- Logs/screenshots: ...
- Additional context: ...