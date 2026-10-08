# Contributing to Sinew

Thank you for your interest in Sinew! This root repository coordinates the documentation site, design/architecture, and the language-specific implementations. Most code changes happen in the submodules, while the documentation lives under docs/.

- Kotlin implementation: `kotlin-lib/`
- Dart implementation: `dart-lib/`
- Documentation website: `docs/`

If your contribution affects only one language, work in that submodule. If it affects documentation or cross-cutting design, open an issue/PR in the root repo.

## How you can contribute
- Use the issue templates in `.github/ISSUE_TEMPLATE` to report bugs or request features.
- Improve docs in `docs/` (see “Contributing to Docs” below).
- Implement features or fixes in `kotlin-lib/` or `dart-lib/`.
- Improve tests, CI, and developer experience.

## Where to open issues and PRs
- Kotlin library changes → open in `kotlin-lib/` and scope your PR to that path.
- Dart library changes → open in `dart-lib/` and scope your PR to that path.
- Docs, design, or multi-language coordination → open at the root repository.

We may ask you to move an issue/PR to the correct submodule if needed.

## Contributing to Docs (Docusaurus)
There are two Docusaurus sites, each built and deployed separately:
- `docs/internal/`: contributor docs (Guide, Contributing). The Guide pages are generated from the Sinew design notes by `docs/internal/scripts/sync_vault.py`; change the notes and re-run the script instead of editing the generated `.mdx` files. Contributing pages are hand-written.
- `docs/usage/`: usage docs for app developers, hand-written.

For Kotlin/Dart content, use the `KotlinOnly` / `DartOnly` and `LangTabs` components so readers keep their preferred language across pages.

Run a site locally (Node 20+), from `docs/internal/` or `docs/usage/`:
- Install deps: `npm install`
- Start dev server: `npm run start`
- Build static site: `npm run build`

## Workflow
Sinew is trunk-based: `main` is the only long-lived branch, and every change reaches it through a squash-merged PR. The full guide is the [Git workflow](https://sinew-dev.srctool.com/contributing/git-workflow) page.

1. Branch from the latest `main`: `<type>/<short-description>` (for example `feat/pager-cursor-strategy`). Maintainers push branches to the organization repository; others fork.
2. Make changes with small, focused commits.
3. Ensure formatting and checks pass (see each submodule's CONTRIBUTING for language specifics).
4. Open a Pull Request into `main` using the template (`.github/PULL_REQUEST_TEMPLATE.md`) and link related issues (e.g., "Fixes #123").

### PR title format (Conventional Commits)
Use Conventional Commit style for PR titles. Format:

```
<type>(<scope>): <short description>
```

- type: one of `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- scope: affected module/package (e.g., `kotlin-lib`, `dart-lib`, `docs`)
- short description: concise summary of the change

Examples:
- feat(kotlin-lib): add redact() helper for masked logging
- fix(dart-lib): handle null input in Parser.fromJson
- docs(docs): add a getting started guide for paging

Tip for GitKraken users: GitKraken uses the first line of the commit message as the PR title. You can copy the PR title format directly when committing.

## Merging policy
- Squash and merge only, into the protected `main`. Merge commits and rebase merges aren't used, and nobody pushes or force-pushes to `main` directly.
- On your own branch or fork, use any workflow you like; the final merge into `main` is always a squash.
- The final squashed commit title is taken from the PR title; the body is taken from the PR description.
- Keep the PR title in Conventional Commits format and ensure the description explains the "what" and "why`. Maintainers may edit the final message for clarity.

## Code of Conduct
Participation in this project is governed by the Code of Conduct in each submodule:
- Kotlin: `kotlin-lib/CODE_OF_CONDUCT.md`
- Dart: `dart-lib/CODE_OF_CONDUCT.md`

For sensitive reports, email contact@srctool.com.

## License
- Root repo (docs & concepts): MIT (see LICENSE)
- Kotlin/Dart libraries: Apache 2.0 (see licenses in each submodule)

By contributing, you agree your contributions are licensed under the respective project licenses.

## Questions
If you’re unsure where something belongs or how to start, please open a discussion/issue or email contact@srctool.com. Thanks for contributing!

## Keeping submodules in sync
- Dependabot moves the `kotlin-lib` and `dart-lib` pointers: it checks the libraries' `main` daily and opens one PR that updates both. Merge it like any PR.
- Locally, `git submodule update --init --recursive` checks out the recorded commits. Opt-in hooks do this after every checkout and pull: `git config core.hooksPath .githooks` (they call `scripts/sync-submodules.sh`, which never changes the pointers).

## Release and versioning
- The libraries are released in their own repositories by pushing a tag on `main`: `vX.Y.Z` in `sinew-kotlin` (Maven Central), `<package>-vX.Y.Z` in `sinew-dart` (pub.dev). Their publish workflows publish and create the GitHub Release.
- This repository has no release of its own: merging to `main` deploys the docs sites, and the Dependabot PR moves the submodule pointers to the released commits.
- Fixes to a released version: an ordinary PR into `main`, then a patch tag. See the Release process page in Contributing.
