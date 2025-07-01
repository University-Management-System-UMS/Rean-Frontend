## fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android beta

```sh
[bundle exec] fastlane android beta
```

Submit a new Beta Build to Play Store

### android build

```sh
[bundle exec] fastlane android build
```

Build a signed Android app bundle

### android bump_version_android

```sh
[bundle exec] fastlane android bump_version_android
```

Increment Android version name and reset version code if needed

### android beta_dev

```sh
[bundle exec] fastlane android beta_dev
```

### android beta_uat

```sh
[bundle exec] fastlane android beta_uat
```

### android release_prod

```sh
[bundle exec] fastlane android release_prod
```

---

## iOS

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Get certificates

### ios generate_new_certificates

```sh
[bundle exec] fastlane ios generate_new_certificates
```

Generate new certificates

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Push a new beta build to TestFlight

### ios deploy

```sh
[bundle exec] fastlane ios deploy
```

Deploy to App Store

### ios beta_dev

```sh
[bundle exec] fastlane ios beta_dev
```

### ios beta_uat

```sh
[bundle exec] fastlane ios beta_uat
```

### ios release_prod

```sh
[bundle exec] fastlane ios release_prod
```

### ios bump_version_ios

```sh
[bundle exec] fastlane ios bump_version_ios
```

Increment iOS version number and reset build number if needed

---

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
