---
sidebar_label: Run and write tests
title: How to run and write tests
---

This page covers how we test Sinew across Kotlin and Dart implementations, plus general guidelines for writing good tests.

Commands

Kotlin (kotlin-lib/)
- Build & unit tests: ./gradlew build test
- Run only tests: ./gradlew test
- Helpful flags: --info, --stacktrace

Dart (dart-lib/)
- Format: dart format .
- Lint: dart analyze (or flutter analyze)
- Unit tests: dart test (or flutter test)

General testing guidelines
- Prefer fast, deterministic unit tests. Avoid real network, time, or file system where possible; mock or fake instead.
- Keep tests small and focused on behavior. One assertion per concept.
- Name tests clearly to express intent. Example: Parser.fromJson returns null for blank input.
- Structure: Given/When/Then or Arrange/Act/Assert.
- Cover edge cases (null/empty inputs, large inputs, invalid states).
- For bug fixes, first add a failing test that reproduces the issue, then fix the code, then ensure the test passes.
- Avoid testing private implementation details; test public behavior and contract.

Docs site
- For documentation-only changes, you can build or start the site to sanity-check MD/MDX formatting and components:
  - From docs/internal/ or docs/usage/: npm install && npm run start
  - Build: npm run build

CI and flaky tests
- If a test is flaky, attempt to deflake by isolating global state, adding explicit waits, or improving determinism. As a last resort, quarantine with clear tracking to fix.

Where to put tests
- Kotlin: follow the module’s standard src/test/java (or kotlin) layout.
- Dart: place tests under test/ with _test.dart suffix.

Reporting coverage
- We generally prefer correctness and meaningful assertions over coverage numbers, but feel free to add coverage tooling appropriate to each submodule.