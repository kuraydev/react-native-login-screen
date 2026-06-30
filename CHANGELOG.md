# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **react-native-web support** (closes #56, #11). `LoginScreen` now renders and
  functions under `react-native-web` without throwing. Added a web smoke test
  (`src/__tests__/LoginScreen.web.test.tsx`) that renders under `Platform.OS === "web"`
  and asserts the tooltip flow degrades gracefully without invoking
  `LayoutAnimation`.

### Fixed

- Guarded the `LayoutAnimation.spring()` calls in the email/password validation
  flow behind a web-only check (new `src/helpers/layoutAnimation.ts` helper).
  `react-native-web` does not implement `LayoutAnimation`, so the unconditional
  call previously threw/warned on web. Native (iOS/Android) behavior is unchanged.

## [6.0.0]

A maintenance overhaul focused on tooling, correctness and documentation.
The public component API (exported names, prop names and runtime defaults) is
unchanged, but the published build output, dependency declarations and TypeScript
types changed — see **Breaking** below. A **major** release is recommended.

### Added

- Real test suite (Jest + `@testing-library/react-native`): unit tests for
  `emailValidator` and `passwordValidator`, and render/interaction tests for
  `LoginScreen` and `SocialButton` (24 tests).
- GitHub Actions CI (`.github/workflows/ci.yml`) running lint, typecheck, test and
  build on a Node 18/20/22 matrix, plus a manual `release` workflow that drives
  `semantic-release`.
- `peerDependencies` for `react` (`>=16.8.0`) and `react-native` (`>=0.60.0`).
- `accessibilityRole` / `accessibilityLabel` on the login button, signup button,
  social buttons and text inputs.
- Explicit `types`, `module`, `react-native`, `source`, `exports` and `files`
  fields in `package.json`.
- `CHANGELOG.md`, `CONTRIBUTING.md`, issue templates and a pull-request template.
- New Architecture / Expo compatibility statement and a documented platform-support
  note covering the open web-support issues (#11, #56).

### Changed

- Migrated the build pipeline from the bespoke `tsc` + `cpx` + the unmaintained
  `react-native-typescript-transformer` to `react-native-builder-bob`
  (commonjs / module / typescript targets). Source moved from `lib/` to `src/`.
- Replaced the dead `tslint` lint script with ESLint 9 flat config
  (`eslint.config.js`).
- `LoginScreen` is now wrapped in `React.memo`; render helpers and default tooltip
  content are memoized instead of being recreated on every render.
- Style widths now derive from `useWindowDimensions` instead of a module-load
  `Dimensions.get('screen')` call, making layouts responsive to rotation and
  avoiding a top-level `Dimensions` read that breaks under `react-native-web`.
- Replaced `any`-typed props with real types: `logoImageSource`
  (`ImageSourcePropType`), `children` (`React.ReactNode`), `TouchableComponent`
  (a typed component) and a fully generic `useStateWithCallback`.

### Fixed

- **`passwordValidator` regex bug**: `patternNormal`, `patternMedium` and
  `patternHigh` used `\\d` (a literal backslash + `d`) instead of `\d`, so the
  digit requirement could never be satisfied. Passwords are now validated correctly.
  This is a behavior change — see **Breaking**.
- Guarded `LayoutAnimation` on Android with
  `UIManager.setLayoutAnimationEnabledExperimental(true)` so tooltip animations
  actually run instead of no-op'ing/warning.
- Removed unnecessary escapes in the email-validation regex.

### Removed

- Dead/deprecated dev dependencies: `react-native-typescript-transformer`,
  `@types/react-native`, `cpx`, `npm-post-install`, `prettier-format`,
  `eslint-config-airbnb`, and the `tslint` reference.

### Breaking

- **Build output / entry points** moved from `./build/dist/index.js` to the
  builder-bob layout (`main` → `lib/commonjs/index.js`, plus `module`, `types`,
  `react-native`, `source` and an `exports` map). The bare package-name import
  (`import LoginScreen from "react-native-login-screen"`) and the default + named
  exports are unchanged, but any deep import of `build/dist/...` will break.
- **`passwordValidator`** now enforces the digit rule it always documented; some
  passwords that previously passed (because validation was effectively disabled by
  the regex bug) may now fail. Blast radius is limited because
  `enablePasswordValidation` defaults to `false`.
- **`react-native-text-input-interactive`** range tightened from the open-ended
  `>=0.1.4` to `>=0.1.4 <1.0.0`.
- TypeScript prop types were tightened away from `any`; strict consumers may see
  new type errors (no runtime change).

[Unreleased]: https://github.com/kuraydev/react-native-login-screen/compare/v5.0.0...HEAD
