---
sidebar_label: Git workflow
title: Git workflow
---

Sinew uses **trunk-based development** in all three repositories: `main` is the only long-lived branch. Work happens on short-lived branches that are squash-merged into `main` through pull requests, and library releases are tags on `main`.

| Repository | Holds | Released by |
|---|---|---|
| `srctool/sinew` | the docs sites, CI, and the `kotlin-lib` / `dart-lib` submodule pointers | nothing to release: merging to `main` deploys the docs |
| `srctool/sinew-kotlin` | the Kotlin library | a tag `vX.Y.Z` on `main` → Maven Central |
| `srctool/sinew-dart` | the Dart packages | a tag `<package>-vX.Y.Z` on `main` → pub.dev |

## Branches

- `main` is always releasable: every change reaches it through a pull request with green checks, and nobody pushes to it directly.
- Branch from the latest `main`, one topic per branch, and keep it short-lived (days, not weeks).
- Name branches `<type>/<short-description>`, with the same types as PR titles: `feat/pager-cursor-strategy`, `fix/auth-refresh-race`, `docs/theme-tokens`, `chore/dependabot`.
- Branches are deleted automatically after the merge.

## Where to branch: maintainers and contributors

- **Maintainers** (write access to `srctool/*`): push branches to the organization repository and open the PR there. No fork needed, and workflows can push to your branch.
- **Everyone else**: fork the repository, push branches to your fork, and open the PR against `srctool/<repo>`'s `main`. Workflows that push (such as Dependabot) can't push to a fork, which is fine for normal changes.

## Day to day

```bash
git switch main
git pull                        # fast-forward to the latest main
git switch -c feat/my-change
# … commit …
git push -u origin feat/my-change
```

Then open a PR into `main`. If `main` moves while your PR is open, update your branch with either:

```bash
git pull --rebase origin main   # your branch only; rewrites your unmerged commits
```

or the **Update branch** button on the PR. Rebasing your own unmerged branch is fine. Never rebase or force-push `main`.

Forks: add the organization repository as `upstream` once (`git remote add upstream https://github.com/srctool/<repo>.git`), then use `git pull --rebase upstream main` instead.

## Pull requests and merging

- Target: always `main`.
- Title: Conventional Commits, `<type>(<scope>): <short description>` with type `feat`, `fix`, `docs`, `style`, `refactor`, `test` or `chore` (see [Open a pull request](./how-to-open-a-pull-request)).
- Merge method: **squash and merge only**. The squashed commit's title is the PR title and its body is the PR description, so `main` gets one well-described commit per PR.
- Checks must be green: the Docs build in this repository; `check` in the library repositories.

## Submodules (this repository)

`kotlin-lib` and `dart-lib` point at commits on the libraries' `main`.

- **Dependabot** checks the libraries daily and opens one PR (`chore(submodules): …`) that moves both pointers to their latest `main`. Review the listed commits and merge it like any PR. Dependabot also opens weekly PRs that update the GitHub Actions versions.
- To pick up a library change sooner, open the Dependabot page (Insights → Dependency graph → Dependabot) and choose **Check for updates**.
- Locally, `git submodule update --init --recursive` checks out the recorded commits. The opt-in hooks do this after every checkout and pull: `git config core.hooksPath .githooks`.
- The submodule URLs use HTTPS, so cloning works without SSH keys. To push from inside a submodule, add your own remote (`git -C kotlin-lib remote add mine git@github.com:<you>/sinew-kotlin.git`) or set its push URL.

## Releases

1. In the library repository, make sure `main` has everything for the release, then tag the commit on `main` and push the tag. The publish workflow checks the tag is on `main`, publishes, and creates the GitHub Release (see [Release process](./release-process)).
2. Merge the Dependabot PR in this repository that moves the pointer to the released commit, so the docs and pointers match the release.

A fix to a released version is an ordinary PR into `main` followed by a patch tag. While the version is `0.x`, there are no maintenance branches; if one is ever needed, branch `release/X.Y` from the tag and cherry-pick fixes onto it.

## Don'ts

- Don't push to `main` directly or force-push it; branch protection blocks both.
- Don't keep long-lived branches other than `main`.
- Don't move submodule pointers by hand in a feature PR unless the PR needs that exact library commit; let Dependabot do it.
