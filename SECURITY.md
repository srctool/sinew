# Security Policy

Sinew handles HTTP authentication, token refresh, secure storage and encryption, so we take security reports seriously. Thank you for helping keep Sinew and the apps built on it safe.

## Supported versions

Sinew is pre-1.0 and has no published release yet. Security fixes go to the `main` branch of each library.

After 1.0, the latest minor release gets security fixes. This section will list the supported versions then.

| Version | Supported |
|---|---|
| `main` (pre-1.0) | ✅ |

## Reporting a vulnerability

**Please don't report a vulnerability in a public issue, pull request or discussion.**

Report it privately through GitHub's **Report a vulnerability** form, on the repository where the problem is:

- Kotlin library: [srctool/sinew-kotlin](https://github.com/srctool/sinew-kotlin/security/advisories/new)
- Dart and Flutter library: [srctool/sinew-dart](https://github.com/srctool/sinew-dart/security/advisories/new)
- Documentation, design, or if you're not sure: [srctool/sinew](https://github.com/srctool/sinew/security/advisories/new)

If you can't use GitHub, email **contact@srctool.com** with "Security" in the subject.

Please include:

- the affected package and version or commit
- the platform (Android, iOS, JVM, wasmJs, Flutter) if it matters
- a description of the issue and its impact
- steps to reproduce, or a proof of concept
- any suggested fix

## What to expect

- We aim to acknowledge your report within 3 business days.
- We'll confirm whether the issue is accepted, and keep you updated while we work on a fix.
- We'll publish a GitHub security advisory when the fix is released, and credit you unless you'd prefer not to be named.

Please give us reasonable time to release a fix before you disclose the issue publicly.

## Scope

In scope: the Sinew libraries (`sinew-*` modules and `sinew_*` packages), including the auth and token refresh layer, redacted logging, `SecureStore`, `FieldCipher`, `BiometricVault`, and the guarantee that DevTools is compiled out of release builds.

Out of scope:

- vulnerabilities in third-party dependencies (Ktor, Dio, Tink, platform keystores). Report these upstream. Tell us too if Sinew uses the dependency in an unsafe way.
- the security of an app's own configuration, such as its `TokenSource`, backend or stored data
- the documentation websites, unless the issue affects users of the libraries
