# Sinew usage docs

Docs for developers using Sinew in an app. Pages live in `docs/`; the sidebar follows the folders.

```bash
npm install
npm run start
npm run build
```

The Contributing link goes to the contributor site (docs/internal), set with `SINEW_INTERNAL_URL` (default `http://localhost:3000`). This site's own address is `SINEW_USAGE_URL` (default `http://localhost:3001`).

## Code samples

Every sample on the site is real code. A fenced block whose first line is `// sample: <path>#<region>` is a copy of a region (between `// region <name>` and `// endregion` lines) of a file in `kotlin-lib/` or `dart-lib/`:

- Kotlin samples live in `kotlin-lib/sample/docs`, a module CI compiles, whose tests CI runs, and in the sample app.
- Dart samples live in the example app and in each package's `example/`, which the analyzer covers.

```bash
python3 docs/usage/scripts/sync_samples.py           # rewrites every block from its source
python3 docs/usage/scripts/sync_samples.py --check   # exits 1 when a block differs from its source
```

Change a sample in its library, run the script, and commit the result. Run `--check` before a release: it fails on a block that no longer matches.

The pages' structure and prose are plain MDX in `docs/`; the language switch drives every `<LangTabs>` group.
