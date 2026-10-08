rootProject.name = "sinew"

pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
        google()
    }
}

// Make the repo root a Gradle composite so Android Studio can link the Gradle project
// when you open the repository root. This delegates to the actual build in kotlin-lib/.
includeBuild("kotlin-lib")
