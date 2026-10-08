---
slug: /
title: Contributing to Sinew
---

Welcome! This section explains how to contribute to the Sinew project, including the docs site and the Kotlin/Dart library implementations.

Sinew is organized as a single umbrella repository with two language submodules and a Docusaurus documentation site:

- Kotlin library: kotlin-lib/
- Dart library: dart-lib/
- Contributor docs site (this site): docs/internal/
- Usage docs site, for app developers: docs/usage/

Where to contribute
- If your change affects only one language, open an issue/PR targeted to that submodule path (kotlin-lib/ or dart-lib/).
- If it affects cross-cutting design or the documentation website, open it in the root repository and/or the docs/internal/ or docs/usage/ folder as appropriate.

Start with the design
- [Guide](/guide): what Sinew is, the architecture, the error model, every package with its Kotlin and Flutter implementation, the roadmap and the decisions.

Quick links
- Git workflow (branches, PRs, submodules, releases) → /contributing/git-workflow
- How to report a bug → /contributing/how-to-report-a-bug
- How to contribute code → /contributing/how-to-contribute-code
- How to open a pull request → /contributing/how-to-open-a-pull-request
- How to run and write tests → /contributing/how-to-run-and-write-test
- Versioning policy → /contributing/versioning-policy
- Release process → /contributing/release-process

Docs authoring tips
- The Guide pages (docs/internal/development/guide) are generated from the Sinew design notes by `docs/internal/scripts/sync_vault.py`. Don't edit them by hand: change the notes and re-run the script. The sidebars follow the folders.
- Each generated page has a Concept part (shown for every language) and an Implementation part (Kotlin or Dart, picked with the language switcher).
- For hand-written pages, use the KotlinOnly, DartOnly and LangTabs components for Kotlin/Dart content so readers keep their preferred language across pages.

Code of Conduct
Participation is governed by the Code of Conduct files in each submodule. For sensitive reports, email contact@srctool.com.