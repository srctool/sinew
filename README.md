[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-Website-blue.svg)](docs/)

# Sinew - SRC Tool

**Sinew** is a plug-and-play app architecture for Kotlin Multiplatform and Flutter, part of the **SRC Tool** family alongside [Camouflage](https://github.com/srctool/camouflage). Sinews connect muscle to bone; Sinew connects an app's layers, data → domain → presentation, so new apps stop rewriting response mapping, paging, error types, the HTTP client with token refresh, and secure storage. Sinew ships the mechanism; the app ships the configuration.

This repository is the umbrella for the documentation and the language-specific implementations, which are included as Git submodules. The libraries live under `kotlin-lib/` and `dart-lib/`. The documentation site is built with Docusaurus under `docs/`.

---

## Repository structure
```
├── README.md                  # This overview
├── LICENSE                    # Main repo license (MIT)
├── docs/                      # Two Docusaurus sites, deployed separately
│   ├── internal/              # Contributor docs: design, architecture, implementation (generated Guide + Contributing)
│   └── usage/                 # Usage docs: for developers using Sinew in an app
├── kotlin-lib/                # Kotlin Multiplatform implementation (submodule: srctool/sinew-kotlin)
└── dart-lib/                  # Dart and Flutter implementation (submodule: srctool/sinew-dart)
```

---

## Documentation

There are two documentation sites, each its own Docusaurus project, built and deployed separately:

- **Contributor docs** (`docs/internal/`): the architecture, the error model, every package with its Kotlin and Flutter implementation, the roadmap and the decisions, plus Contributing. The Guide pages are generated from the Sinew design notes by `docs/internal/scripts/sync_vault.py`; don't edit them by hand.
- **Usage docs** (`docs/usage/`): adding Sinew to an app, wiring it, and building screens on it. Written by hand; they start with the first release.

The usage site doesn't link to the contributor docs directly: its **Contributing** link goes to the contributor site's Contributing section, which leads into the Guide. Set `SINEW_INTERNAL_URL` (default `http://localhost:3000`) when building the usage site, and each site's own address with `SINEW_INTERNAL_URL` / `SINEW_USAGE_URL`.

Regenerate the Guide after editing the design notes (from `docs/internal/`):

```bash
python3 scripts/sync_vault.py <path-to-sinew-design-notes>
```

Run a site locally (Node 20+), from `docs/internal/` or `docs/usage/`: `npm install`, then `npm run start` (the contributor site runs on port 3000, the usage site on 3001); `npm run build` for a production build. VS Code launch configurations for both are in `.vscode/`.

### Deployment

Both sites are deployed to Cloudflare Pages by `.github/workflows/docs.yml` when `docs/` changes on `main` in `srctool/sinew`. Pull requests (including from forks) only build them.

| Site | Folder | Cloudflare Pages project | Domain |
|---|---|---|---|
| Contributor docs | `docs/internal/` | `sinew-dev` | https://sinew-dev.srctool.com |
| Usage docs | `docs/usage/` | `sinew` | https://sinew.srctool.com |

The workflow needs two repository secrets: `CLOUDFLARE_API_TOKEN` (a token with *Account → Cloudflare Pages → Edit*) and `CLOUDFLARE_ACCOUNT_ID`.

The sites include a Kotlin/Dart language switcher. Wrap language-specific content in `KotlinOnly` / `DartOnly`, or code examples in `LangTabs`, so readers keep their preferred language across pages.

---

## Submodules

Submodule pointers are moved by Dependabot: it checks the libraries' `main` daily and opens a PR that updates `kotlin-lib` and `dart-lib` (see `.github/dependabot.yml`). The submodule URLs use HTTPS, so cloning needs no SSH key:

```bash
git clone --recurse-submodules https://github.com/srctool/sinew.git
```

The libraries are built, tested and released in their own repositories; this repository has no release of its own.

### Kotlin implementation (`kotlin-lib/`)
- Kotlin Multiplatform: Android, iOS, JVM desktop, wasmJs. Maven Central `com.srctool.sinew:sinew-*`, with a BOM.
- Upstream: https://github.com/srctool/sinew-kotlin
- License: Apache 2.0

### Dart implementation (`dart-lib/`)
- A pub workspace managed by Melos, one package per Sinew package. pub.dev `sinew_*`.
- Upstream: https://github.com/srctool/sinew-dart
- License: Apache 2.0

The root `settings.gradle.kts` includes `kotlin-lib` as a composite build, so opening the repository root in Android Studio works.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the Contributing section of the docs. Changes that affect one implementation go to its submodule repository; documentation and cross-cutting changes go here.

---

## License

- Main repository (docs and design): MIT License
- Kotlin and Dart implementations: Apache 2.0 License

## Contact

contact@srctool.com
