# Sinew

[![License: MIT (docs)](https://img.shields.io/badge/docs-MIT-blue.svg)](LICENSE)
[![License: Apache 2.0 (libraries)](https://img.shields.io/badge/libraries-Apache%202.0-blue.svg)](https://github.com/srctool/sinew-kotlin/blob/main/LICENSE)
[![Docs](https://img.shields.io/badge/docs-sinew.srctool.com-informational.svg)](https://sinew.srctool.com)
![Status: pre-1.0](https://img.shields.io/badge/status-pre--1.0-orange.svg)

**The app plumbing you rewrite in every project, done once, for Kotlin Multiplatform and Flutter.**

Every new app needs the same things: map API responses to domain models, turn failures into errors the UI can show, page through lists, keep screen state, refresh tokens without a race, and store secrets safely. Sinew ships these as small packages you add one at a time. Sinew provides the mechanism, and your app provides the configuration (its JSON keys, base URLs, error codes and DI).

Sinew is part of the **SRC Tool** family, alongside [Camouflage](https://github.com/srctool/camouflage) (UI). Each one works without the other.

> **Status: pre-1.0.** Nothing is published to Maven Central or pub.dev yet, and the API may change before 1.0. The models, errors, paging, presentation, network, security and storage packages are implemented on both platforms. Testing helpers, the Camouflage glue and the sample apps are in progress. See the [roadmap](https://sinew-dev.srctool.com/guide/project/roadmap).

---

## What it looks like

Declare what your backend sends and what your app needs. Sinew handles the mapping and the error handling in between.

```kotlin
// Domain: what the app works with
data class Order(val id: String, val total: Long) : Domain

// Remote: what the API sends. Fields are nullable, and toDomain() picks the fallbacks.
@Serializable
class OrderRemote(val id: String? = null, val total: Long? = null) : Remote<Order>() {
    override fun toDomain() = Order(id = id.orEmpty(), total = total ?: 0)
}

// Your backend's response shape. You declare the fields, and the base class maps the payload.
@Serializable
class ObjectResponse<T : Remote<D>, D : Domain>(override val data: T? = null) : ObjectEnvelope<T, D>()

// Repository: one guarded call. Any failure becomes a typed SinewException with a code like ORD-R-CANCEL-NIC.
suspend fun cancel(id: String): Result<Order> = processApiCall("ORD", "CANCEL") { api.cancel(id) }

// View model: no try/catch, one immutable state, one-off effects
class OrderViewModel(private val repo: OrderRepository) :
    StateEffectViewModel<ViewState<Order>, OrderEffect>(ViewState.Loading()) {

    fun cancel(id: String) = viewModelScope.launch {
        repo.cancel(id).fold(
            onSuccess = { setState { ViewState.Done(it) }; emitEffect(OrderEffect.Cancelled) },
            onFailure = { setState { ViewState.Failed(dataOrNull, it) } },
        )
    }
}
```

<details>
<summary>The same in Dart</summary>

```dart
class Order extends Domain {
  const Order({required this.id, required this.total});
  final String id;
  final int total;

  @override
  List<Object?> get props => [id, total];
}

class OrderRemote extends Remote<Order> {
  const OrderRemote({this.id, this.total});
  final String? id;
  final int? total;

  @override
  Order toDomain() => Order(id: id ?? '', total: total ?? 0);
}

class ObjectResponse<T extends Remote<D>, D extends Domain> extends ObjectEnvelope<T, D> {
  const ObjectResponse({this.data});

  @override
  final T? data;
}

Future<Result<Order>> cancel(String id) => processApiCall('ORD', 'CANCEL', () => api.cancel(id));
```

On Flutter, view models are Riverpod notifiers that use the `StateEffectNotifier` and `EventActionNotifier` mixins from `sinew_riverpod`.

</details>

## Features

- **Envelopes that map themselves.** Declare your response shape once. Every object, list and page is mapped, and you never write a mapper function. Sinew assumes no JSON keys: `success`, `message` and page metadata are read from your own fields.
- **One error model, end to end.** Each layer turns failures into a typed `SinewException` with a stable code, and returns a `Result`. View models never `try`/`catch`. Error messages are localized and re-render when the language changes. English and Indonesian are included.
- **State-driven paging.** `Pager<T>` owns the rules (first load, load more, retry, refresh, end of list, race conditions). A list screen only says how to fetch one page.
- **Presentation base classes.** Event → action → state + effect, framework-neutral, with adapters for AndroidX `ViewModel` and Riverpod.
- **HTTP client layers.** Built on Ktor or Dio, which you keep using directly. It adds single-flight token refresh (ten parallel 401s cause one refresh), timeouts, retry, polling, redacted logging and a network checker.
- **Secure storage and encryption.** `SecureStore`, `KeyValueStore`, field encryption with Tink AEAD, and a biometric vault. No hand-rolled cryptography.
- **Testing helpers.** Fakes for every service, plus paging race helpers.
- **Optional extras.** `sinew_camouflage` connects paging to Camouflage's `CamoPagedList`. DevTools (an in-app inspector, compiled out of release builds) is planned for 1.1.

Each package depends only on the ones before it. For example, an app that only wants paging adds `sinew_paging` and gets models and exceptions with it, and nothing else.

## Platforms

| | Kotlin Multiplatform | Flutter / Dart |
|---|---|---|
| Targets | Android, iOS, JVM desktop, wasmJs (also usable from a plain Android app) | Android and iOS. The pure-Dart packages (models, exception, paging, presentation) run anywhere Dart runs. |
| Built on | Ktor 3, kotlinx.serialization, AndroidX ViewModel | Dio 5, Riverpod |
| Coordinates (at 1.0) | `com.srctool.sinew:sinew-*` with `sinew-bom` | `sinew_*` on pub.dev |
| Source | [srctool/sinew-kotlin](https://github.com/srctool/sinew-kotlin) | [srctool/sinew-dart](https://github.com/srctool/sinew-dart) |

## Trying it before 1.0

Until the first release, use Sinew from source.

**Kotlin.** Clone [sinew-kotlin](https://github.com/srctool/sinew-kotlin) and include it as a composite build. Gradle then resolves the `com.srctool.sinew` modules from the source:

```kotlin
// settings.gradle.kts
includeBuild("../sinew-kotlin")
```

**Dart.** Depend on a package through git:

```yaml
dependencies:
  sinew_network:
    git:
      url: https://github.com/srctool/sinew-dart.git
      path: packages/sinew_network
```

## Documentation

- **[Usage docs](https://sinew.srctool.com):** adding Sinew to an app, wiring it, and building screens. These fill in as the 1.0 API settles.
- **[Design guide](https://sinew-dev.srctool.com/guide):** the architecture, the error model, and every package with its Kotlin and Flutter implementation, plus the roadmap and the design decisions.

## Contributing

Issues and pull requests are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md). Library changes go to [sinew-kotlin](https://github.com/srctool/sinew-kotlin) or [sinew-dart](https://github.com/srctool/sinew-dart). Documentation and cross-platform design changes go to this repository.

Everyone taking part is expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md). To report a security issue, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.

### About this repository

This is the umbrella repository. It holds the documentation sites and includes both libraries as Git submodules:

```
├── docs/usage/      # Usage docs site (Docusaurus)
├── docs/internal/   # Design guide and contributor docs site (Docusaurus)
├── kotlin-lib/      # submodule: srctool/sinew-kotlin
└── dart-lib/        # submodule: srctool/sinew-dart
```

```bash
git clone --recurse-submodules https://github.com/srctool/sinew.git
```

Opening the root in Android Studio works: `settings.gradle.kts` includes `kotlin-lib` as a composite build.

## License

The libraries are licensed under [Apache 2.0](https://github.com/srctool/sinew-kotlin/blob/main/LICENSE). The documentation and design material in this repository are licensed under [MIT](LICENSE).

Contact: contact@srctool.com
