---
sidebar_label: Open a pull request
title: How to open a pull request
---

Use this checklist to submit a high‑quality PR.

Before you open the PR
- Update your branch with the latest main (`git pull --rebase origin main`, or the PR's **Update branch** button) and resolve conflicts locally.
- Ensure builds and tests pass locally (see language‑specific steps below).
- Run format/lint tools.
- Update docs and changelogs (if applicable).

PR title and description
- Title uses Conventional Commits style: `<type>(<scope>): <short description>`
  - Examples: feat(kotlin-lib): add redact() helper; fix(dart-lib): avoid late init error
- Description includes:
  - What changed and why
  - Links to related issues (e.g., “Fixes #123”) and design discussions
  - Screenshots or logs for visible behavior changes
  - Migration notes if breaking changes

Target and scope
- Target branch: always `main` (trunk-based; see [Git workflow](./git-workflow)).
- Kotlin changes → affect files under kotlin-lib/
- Dart changes → affect files under dart-lib/
- Docs changes → affect files under docs/internal/ or docs/usage/
- Multi‑area changes: call out each area touched and test scope.

Reviewer checklist (run locally)
- Kotlin: ./gradlew build test
- Dart: dart format . && dart analyze && dart test (or flutter test)
- Docs: from docs/internal/ and docs/usage/: npm install && npm run build (or npm start for smoke testing)

After opening the PR
- Be responsive to review feedback; keep commits focused.
- Avoid force‑pushes during review unless requested (they make it harder to review deltas).
- When squashing/merging, preserve the Conventional Commit style in the final message.

Merging policy
- Squash and merge only, into the protected `main`. Merge commits and rebase merges aren't used.
- On your own branch or fork, use any workflow you like; the final merge into `main` is always a squash.
- At least one approval is required. Maintainers may request additional reviewers based on scope.
- CI must be green. Maintainers may re‑run flaky jobs or ask for follow‑ups if needed.
- The squashed commit title comes from the PR title; the body comes from the PR description. Keep both clear and concise.