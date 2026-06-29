<img alt="React Native Login Screen" src="assets/logo.png" width="1050"/>

[![Battle Tested ✅](https://img.shields.io/badge/-Battle--Tested%20%E2%9C%85-03666e?style=for-the-badge)](https://github.com/kuraydev/react-native-login-screen)

[![One Line of Code to Plug & Play | Fully Customizable Beautiful React Native Login Screen](https://img.shields.io/badge/-One%20Line%20of%20Code%20to%20Plug%20%26%20Play%20%7C%20Fully%20Customizable%20Beautiful%20React%20Native%20Login%20Screen-lightgrey?style=for-the-badge)](https://github.com/kuraydev/react-native-login-screen)

[![npm version](https://img.shields.io/npm/v/react-native-login-screen.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-login-screen)
[![npm](https://img.shields.io/npm/dt/react-native-login-screen.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-login-screen)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <img alt="React Native Login Screen" src="assets/Screenshots/react-native-login-screen.gif" height="788" width="390" />
</p>

A fully customizable, plug-and-play **Login & Signup screen** for React Native with
built-in email/password validation, tooltips, show/hide password and ready-made
social buttons.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Import](#import)
- [Usage](#usage)
  - [Basic login](#basic-login)
  - [Signup screen](#signup-screen)
  - [Using SocialButton](#using-socialbutton)
  - [TypeScript](#typescript)
- [Props](#props)
  - [Required](#required)
  - [Customization (optional)](#customization-optional)
  - [Style props](#style-props)
  - [Advanced customization (slots)](#advanced-customization-slots)
  - [Default social-login buttons](#default-social-login-buttons)
- [SocialButton props](#socialbutton-props)
- [Exported helpers](#exported-helpers)
- [Platform support, New Architecture & Expo](#platform-support-new-architecture--expo)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [Credits](#credits)
- [License](#license)

## Features

- Whole new UI / UX design 😍
- Built-in email validation 📧
- Built-in password validation 🔒
- Built-in email & password tooltips 💬
- Built-in show/hide password 👀
- Fully customizable 🎨
- Ready-to-use `SocialButton` component
- Written in TypeScript, ships its own types
- Compatible with the New Architecture (pure JS, no native code)
- Only **one** runtime dependency

## Installation

```bash
npm install react-native-login-screen
# or
yarn add react-native-login-screen
# or
npx expo install react-native-login-screen
```

This library has a single runtime dependency,
[`react-native-text-input-interactive`](https://github.com/kuraydev/react-native-text-input-interactive),
which is installed automatically. `react` and `react-native` are peer
dependencies (any modern version works: `react >= 16.8`, `react-native >= 0.60`).

## Import

```tsx
import LoginScreen from "react-native-login-screen";
```

Named exports are also available:

```tsx
import LoginScreen, {
  SocialButton,
  emailValidator,
  passwordValidator,
} from "react-native-login-screen";
```

## Usage

### Basic login

```tsx
import React from "react";
import LoginScreen from "react-native-login-screen";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <LoginScreen
      logoImageSource={require("./assets/logo-example.png")}
      onLoginPress={() => {}}
      onSignupPress={() => {}}
      onEmailChange={setUsername}
      onPasswordChange={setPassword}
      enablePasswordValidation
    />
  );
}
```

### Signup screen

```tsx
import { View } from "react-native";
import TextInput from "react-native-text-input-interactive";

<LoginScreen
  logoImageSource={require("./assets/logo-example.png")}
  onLoginPress={() => {}}
  onSignupPress={() => {}}
  onEmailChange={setUsername}
  loginButtonText="Create an account"
  disableSignup
  textInputChildren={
    <View style={{ marginTop: 16 }}>
      <TextInput
        placeholder="Re-Password"
        secureTextEntry
        onChangeText={setRepassword}
      />
    </View>
  }
  onPasswordChange={setPassword}
/>;
```

<p align="center">
  <img alt="React Native Signup Screen" src="assets/Screenshots/react-native-signup-screen.png" height="600" />
</p>

### Using SocialButton

The default social buttons (Facebook / Twitter / Apple / Discord) render
automatically unless you set `disableSocialButtons`. To render your own set,
pass `customSocialLoginButtons` and compose the exported `SocialButton`:

```tsx
import LoginScreen, { SocialButton } from "react-native-login-screen";

<LoginScreen
  logoImageSource={require("./assets/logo-example.png")}
  onLoginPress={() => {}}
  onSignupPress={() => {}}
  onEmailChange={setUsername}
  onPasswordChange={setPassword}
  customSocialLoginButtons={
    <>
      <SocialButton text="Continue with GitHub" onPress={() => {}} />
      <SocialButton
        text="Continue with Google"
        style={{ marginTop: 16 }}
        onPress={() => {}}
      />
    </>
  }
/>;
```

You can also drop any extra UI in via `children`.

### TypeScript

The package ships its own type definitions. The props interfaces are exported for
convenience:

```tsx
import type {
  ILoginScreenProps,
  ISocialButtonProps,
} from "react-native-login-screen";
```

## Props

### Required

| Prop               | Type                         | Description                                 |
| ------------------ | ---------------------------- | ------------------------------------------- |
| `logoImageSource`  | `ImageSourcePropType`        | Logo image (e.g. `require('./logo.png')`)   |
| `onLoginPress`     | `() => void`                 | Called when the **login button** is pressed |
| `onSignupPress`    | `() => void`                 | Called when the **signup link** is pressed  |
| `onEmailChange`    | `(email: string) => void`    | Called when the email input changes         |
| `onPasswordChange` | `(password: string) => void` | Called when the password input changes      |

### Customization (optional)

| Prop                       | Type            | Default               | Description                                       |
| -------------------------- | --------------- | --------------------- | ------------------------------------------------- |
| `onEyePress`               | `() => void`    | `undefined`           | Called when the show/hide-password eye is pressed |
| `signupText`               | `string`        | `"Create an account"` | Signup link text                                  |
| `loginButtonText`          | `string`        | `"Login"`             | Login button text                                 |
| `emailPlaceholder`         | `string`        | `"Email"`             | Email input placeholder                           |
| `passwordPlaceholder`      | `string`        | `"Password"`          | Password input placeholder                        |
| `disableSignup`            | `boolean`       | `false`               | Hide the signup link                              |
| `disableDivider`           | `boolean`       | `false`               | Hide the divider                                  |
| `disableSocialButtons`     | `boolean`       | `false`               | Hide all default social buttons                   |
| `disablePasswordInput`     | `boolean`       | `false`               | Hide the password input                           |
| `disableEmailValidation`   | `boolean`       | `false`               | Disable the built-in email validation             |
| `enablePasswordValidation` | `boolean`       | `false`               | Enable the built-in password validation           |
| `disableEmailTooltip`      | `boolean`       | `false`               | Disable the email validation tooltip              |
| `disablePasswordTooltip`   | `boolean`       | `false`               | Disable the password validation tooltip           |
| `emailContentTooltip`      | `ReactNode`     | default               | Custom content for the email tooltip              |
| `passwordContentTooltip`   | `ReactNode`     | default               | Custom content for the password tooltip           |
| `emailTextInputProps`      | `IInteractiveTextInputProps` | –        | Props forwarded to the email input                |
| `passwordTextInputProps`   | `IInteractiveTextInputProps` | –        | Props forwarded to the password input             |
| `TouchableComponent`       | `ComponentType` | `TouchableOpacity`    | Touchable used for all buttons                    |

### Style props

Each accepts a standard React Native style and is merged on top of the default.

| Prop                      | Type                    | Description                  |
| ------------------------- | ----------------------- | ---------------------------- |
| `style`                   | `StyleProp<ViewStyle>`  | Container (root SafeAreaView) |
| `dividerStyle`            | `StyleProp<ViewStyle>`  | Divider                      |
| `logoImageStyle`          | `StyleProp<ImageStyle>` | Logo image                   |
| `textInputContainerStyle` | `StyleProp<ViewStyle>`  | Text-input container         |
| `loginButtonStyle`        | `StyleProp<ViewStyle>`  | Login button                 |
| `loginTextStyle`          | `StyleProp<TextStyle>`  | Login button text            |
| `signupStyle`             | `StyleProp<ViewStyle>`  | Signup link container        |
| `signupTextStyle`         | `StyleProp<TextStyle>`  | Signup link text             |

### Advanced customization (slots)

Pass a React element to fully replace a section.

| Prop                       | Type        | Description                                        |
| -------------------------- | ----------- | -------------------------------------------------- |
| `customLogo`               | `ReactNode` | Replace the logo                                   |
| `customTextInputs`         | `ReactNode` | Replace the entire text-input block                |
| `textInputChildren`        | `ReactNode` | Extra inputs rendered below the default ones       |
| `customLoginButton`        | `ReactNode` | Replace the login button                           |
| `customSignupButton`       | `ReactNode` | Replace the signup button                          |
| `customDivider`            | `ReactNode` | Replace the divider                                |
| `customSocialLoginButtons` | `ReactNode` | Replace the default social buttons                 |
| `children`                 | `ReactNode` | Extra content appended at the bottom of the screen |

### Default social-login buttons

| Prop              | Type         | Default | Description                             |
| ----------------- | ------------ | ------- | --------------------------------------- |
| `onFacebookPress` | `() => void` | no-op   | Pressed the default **Facebook** button |
| `onTwitterPress`  | `() => void` | no-op   | Pressed the default **Twitter** button  |
| `onApplePress`    | `() => void` | no-op   | Pressed the default **Apple** button    |
| `onDiscordPress`  | `() => void` | no-op   | Pressed the default **Discord** button  |

## SocialButton props

| Prop                 | Type                    | Default            | Description                   |
| -------------------- | ----------------------- | ------------------ | ----------------------------- |
| `text`               | `string`                | – (required)       | Button label                  |
| `onPress`            | `() => void`            | – (required)       | Press handler                 |
| `imageSource`        | `ImageSourcePropType`   | Facebook icon      | Leading icon                  |
| `style`              | `StyleProp<ViewStyle>`  | default            | Container style               |
| `textStyle`          | `StyleProp<TextStyle>`  | default            | Label style                   |
| `textContainerStyle` | `StyleProp<ViewStyle>`  | default            | Label container style         |
| `iconImageStyle`     | `StyleProp<ImageStyle>` | default            | Icon style                    |
| `TouchableComponent` | `ComponentType`         | `TouchableOpacity` | Touchable used for the button |

## Exported helpers

Two validators used internally are also exported so you can reuse them.

```tsx
import { emailValidator, passwordValidator } from "react-native-login-screen";

emailValidator("john@example.com"); // => true
emailValidator("nope"); // => false

// Default policy: min 6 chars, at least one letter and one number.
passwordValidator("abc123"); // => true
passwordValidator("abcdef"); // => false
```

`passwordValidator` also accepts a custom pattern. Three presets are exported:

```tsx
import {
  passwordValidator,
  patternNormal, // min 6 chars, one letter + one number (default)
  patternMedium, // min 8 chars, one letter + one number + one special char
  patternHigh, // min 8 chars, upper + lower + number + special char
} from "react-native-login-screen";

passwordValidator("Abcd123!", patternHigh); // => true
```

## Platform support, New Architecture & Expo

- **iOS & Android:** fully supported.
- **New Architecture (Fabric / TurboModules):** supported. This is a pure
  JavaScript/TypeScript component with no native code, so it works on both the
  old and new architectures with no extra setup.
- **Expo:** works with the managed and bare workflows
  (`npx expo install react-native-login-screen`).
- **Web (`react-native-web`):** partial. Some primitives used here
  (`LayoutAnimation`, `require()`'d image assets) have limited or no web support.
  Tracking issues: [#11](https://github.com/kuraydev/react-native-login-screen/issues/11),
  [#56](https://github.com/kuraydev/react-native-login-screen/issues/56). The
  top-level `Dimensions.get('screen')` read was replaced with `useWindowDimensions`
  to improve web behavior.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the
development setup, scripts and the backward-compatibility policy.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full history of notable changes.

## Credits

For the awesome photo, thanks to
[jcob nasyr from Unsplash](https://unsplash.com/photos/67sVPjK6Q7I).
Thanks to [Torskaya](https://www.flaticon.com/authors/torskaya) for the eye icon.

## License

React Native Login Screen is available under the MIT license. See the
[LICENSE](LICENSE) file for more info.
