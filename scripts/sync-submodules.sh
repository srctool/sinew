#!/usr/bin/env bash
# Check out kotlin-lib and dart-lib at the commits this repository records.
# The pointers themselves are moved by Dependabot PRs; this script never changes them.
#
# Usage: scripts/sync-submodules.sh
# Run by the opt-in hooks in .githooks/ (git config core.hooksPath .githooks).
# It doesn't run `git submodule sync`, which would reset each submodule's origin remote
# (for example, your fork) to the URL in .gitmodules.

set -euo pipefail

echo "[sync-submodules] Checking out the recorded submodule commits..."
git submodule update --init --recursive
git submodule status --recursive
