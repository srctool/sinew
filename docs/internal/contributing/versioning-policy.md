---
sidebar_label: Versioning policy
title: Versioning policy
---

We follow Semantic Versioning (SemVer) for the library submodules, and we keep the docs site aligned with released features.

Scope
- Kotlin library (kotlin-lib/) and Dart library (dart-lib/): every package shares one version, released in lockstep on both platforms.
- Kotlin ships a BOM (`com.srctool.sinew:sinew-bom`) that pins every module to one version. Dart has no BOM; lockstep versions play that role.
- Docs sites (docs/internal/, docs/usage/): not versioned like the libraries; it documents the latest released and in‑progress features. When necessary, we call out version‑specific behavior.

SemVer summary
- While the version is `0.x`, the API is still settling: a MINOR bump may break, and the changelog says so.
- MAJOR (x.0.0): incompatible API changes
- MINOR (x.y.0): backwards‑compatible feature additions
- PATCH (x.y.z): backwards‑compatible bug fixes

Breaking changes
- Require a MAJOR bump and must include migration notes in the PR description and in the CHANGELOG/release notes.
- Deprecate before removing: mark the old API `@Deprecated` (Kotlin and Dart) for one minor version with its replacement, then remove it in the next major.

Release cadence
- We release as needed rather than on a fixed schedule. Multiple small changes may batch into a MINOR release; urgent fixes may trigger PATCH releases.

Changelogs and release notes
- Each submodule maintains its own release notes or changelog (e.g., GitHub Releases). The PR author should draft the notes for user‑visible changes.

Compatibility guarantees
- Within a MAJOR version, we avoid breaking public APIs and behavior. Internal APIs may change without notice.
- We attempt to maintain consistent behavior across Kotlin and Dart where feature parity exists; language‑specific constraints may lead to small differences that will be documented.

Docs versioning
- The docs site reflects the current state of the project. If we later adopt formal docs versioning, we will document the process here and in the site configuration.

Questions
- If you’re unsure how to categorize a change or what version to target, open an issue or ask in your PR. For sensitive topics, email contact@srctool.com.