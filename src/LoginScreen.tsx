import * as React from "react";
import {
  Image,
  ImageStyle,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  UIManager,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import TextInput, {
  IInteractiveTextInputProps,
} from "react-native-text-input-interactive";
/**
 * ? Local Imports
 */
import styles from "./LoginScreen.style";
import SocialButton, {
  TouchableComponentType,
} from "./components/social-button/SocialButton";
import useStateWithCallback from "./helpers/useStateWithCallback";
import emailValidator from "./helpers/emailValidator";
import passwordValidator from "./helpers/passwordValidator";
import springLayoutAnimation from "./helpers/layoutAnimation";
import Tooltip from "./components/tooltip/Tooltip";

// LayoutAnimation is opt-in on Android and is a no-op unless explicitly enabled.
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const dummyFunction = () => {};

export interface ILoginScreenProps {
  signupText?: string;
  disableDivider?: boolean;
  logoImageSource: ImageSourcePropType;
  disableSocialButtons?: boolean;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  disableSignup?: boolean;
  disablePasswordInput?: boolean;
  loginButtonText?: string;
  disableEmailValidation?: boolean;
  enablePasswordValidation?: boolean;
  disableEmailTooltip?: boolean;
  disablePasswordTooltip?: boolean;
  style?: StyleProp<ViewStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
  logoImageStyle?: StyleProp<ImageStyle>;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  loginButtonStyle?: StyleProp<ViewStyle>;
  loginTextStyle?: StyleProp<TextStyle>;
  signupStyle?: StyleProp<ViewStyle>;
  signupTextStyle?: StyleProp<TextStyle>;
  emailTextInputProps?: IInteractiveTextInputProps;
  passwordTextInputProps?: IInteractiveTextInputProps;
  children?: React.ReactNode;
  TouchableComponent?: TouchableComponentType;
  passwordContentTooltip?: React.ReactNode;
  emailContentTooltip?: React.ReactNode;
  customSocialLoginButtons?: React.ReactNode;
  customLoginButton?: React.ReactNode;
  customSignupButton?: React.ReactNode;
  customTextInputs?: React.ReactNode;
  textInputChildren?: React.ReactNode;
  customLogo?: React.ReactNode;
  customDivider?: React.ReactNode;
  onLoginPress: () => void;
  onSignupPress: () => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onFacebookPress?: () => void;
  onTwitterPress?: () => void;
  onApplePress?: () => void;
  onDiscordPress?: () => void;
  onEyePress?: () => void;
}

const LoginScreen: React.FC<ILoginScreenProps> = ({
  style,
  dividerStyle,
  logoImageStyle,
  loginTextStyle,
  loginButtonStyle,
  signupTextStyle,
  signupStyle,
  textInputContainerStyle,
  signupText = "Create an account",
  disableDivider,
  logoImageSource,
  onLoginPress,
  disableSocialButtons,
  disablePasswordInput = false,
  loginButtonText = "Login",
  onSignupPress,
  onEmailChange,
  onPasswordChange,
  onFacebookPress = dummyFunction,
  onTwitterPress = dummyFunction,
  onApplePress = dummyFunction,
  onDiscordPress = dummyFunction,
  emailPlaceholder = "Email",
  passwordPlaceholder = "Password",
  disableSignup = false,
  customSocialLoginButtons,
  customLogo,
  customTextInputs,
  textInputChildren,
  customLoginButton,
  customSignupButton,
  customDivider,
  emailTextInputProps,
  passwordTextInputProps,
  disableEmailValidation = false,
  enablePasswordValidation = false,
  disableEmailTooltip = false,
  disablePasswordTooltip = false,
  emailContentTooltip,
  passwordContentTooltip,
  TouchableComponent = TouchableOpacity,
  onEyePress,
  children,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isEmailTooltipVisible, setEmailTooltipVisible] =
    useStateWithCallback<boolean>(false);
  const [isPasswordTooltipVisible, setPasswordTooltipVisible] =
    useStateWithCallback<boolean>(false);

  const handleEmailChange = React.useCallback(
    (text: string) => {
      isEmailTooltipVisible && setEmailTooltipVisible(false);
      setEmail(text);
      onEmailChange?.(text);
    },
    [isEmailTooltipVisible, onEmailChange, setEmailTooltipVisible],
  );

  const handlePasswordChange = React.useCallback(
    (text: string) => {
      isPasswordTooltipVisible && setPasswordTooltipVisible(false);
      setPassword(text);
      onPasswordChange?.(text);
    },
    [isPasswordTooltipVisible, onPasswordChange, setPasswordTooltipVisible],
  );

  const handleEyePress = React.useCallback(() => {
    setPasswordVisible((oldValue) => !oldValue);
    onEyePress?.();
  }, [onEyePress]);

  const handlePasswordValidation = React.useCallback(() => {
    if (isEmailTooltipVisible) {
      return;
    }
    if (!enablePasswordValidation) {
      onPasswordChange(password);
      return;
    }
    if (enablePasswordValidation && passwordValidator(password)) {
      !disablePasswordTooltip && setPasswordTooltipVisible(false);
      onPasswordChange(password);
      return;
    } else {
      springLayoutAnimation();
      !disableEmailTooltip && setEmailTooltipVisible(false);
      !disablePasswordTooltip && setPasswordTooltipVisible(true);
      onPasswordChange(password);
    }
  }, [
    isEmailTooltipVisible,
    enablePasswordValidation,
    password,
    disablePasswordTooltip,
    disableEmailTooltip,
    onPasswordChange,
    setEmailTooltipVisible,
    setPasswordTooltipVisible,
  ]);

  const handleEmailValidation = React.useCallback(() => {
    if (disableEmailValidation) {
      handlePasswordValidation();
      onEmailChange(email);
      return;
    }

    if (emailValidator(email)) {
      !disableEmailTooltip && setEmailTooltipVisible(false);
      handlePasswordValidation();
      onEmailChange(email);
      return;
    } else {
      springLayoutAnimation();
      !disableEmailTooltip && setEmailTooltipVisible(true);
      onEmailChange(email);
    }
  }, [
    disableEmailValidation,
    email,
    disableEmailTooltip,
    handlePasswordValidation,
    onEmailChange,
    setEmailTooltipVisible,
  ]);

  const renderLogo = React.useCallback(
    () =>
      customLogo || (
        <Image
          resizeMode="contain"
          source={logoImageSource}
          style={[styles.logoImageStyle, logoImageStyle]}
        />
      ),
    [customLogo, logoImageSource, logoImageStyle],
  );

  const emailTooltipContent = React.useMemo(
    () =>
      emailContentTooltip || (
        <View style={styles.emailTooltipContainer}>
          <Text style={styles.emailTooltipTextStyle}>
            That{" "}
            <Text style={styles.emailTooltipRedTextStyle}>email address</Text>{" "}
            doesn't look right
          </Text>
        </View>
      ),
    [emailContentTooltip],
  );

  const renderEmailInput = React.useCallback(
    () => (
      <View style={styles.emailTextInputContainer}>
        <>
          {!disableEmailTooltip && isEmailTooltipVisible && (
            <Tooltip>{emailTooltipContent}</Tooltip>
          )}
          <TextInput
            placeholder={emailPlaceholder}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
            accessibilityLabel={emailPlaceholder}
            onFocus={() => setEmailTooltipVisible(false)}
            {...emailTextInputProps}
          />
        </>
      </View>
    ),
    [
      disableEmailTooltip,
      isEmailTooltipVisible,
      emailTooltipContent,
      emailPlaceholder,
      handleEmailChange,
      emailTextInputProps,
      setEmailTooltipVisible,
    ],
  );

  const passwordTooltipContent = React.useMemo(
    () =>
      passwordContentTooltip || (
        <View style={styles.passwordTooltipContainer}>
          <Text style={styles.passwordTooltipTextStyle}>
            Incorrect{" "}
            <Text style={styles.passwordTooltipRedTextStyle}>password</Text>
          </Text>
        </View>
      ),
    [passwordContentTooltip],
  );

  const renderPasswordInput = React.useCallback(() => {
    const eyeIcon = isPasswordVisible
      ? require("./local-assets/eye.png")
      : require("./local-assets/eye-off.png");

    return (
      !disablePasswordInput && (
        <View style={styles.passwordTextInputContainer}>
          {!disablePasswordTooltip && isPasswordTooltipVisible && (
            <Tooltip>{passwordTooltipContent}</Tooltip>
          )}
          <TextInput
            placeholder={passwordPlaceholder}
            secureTextEntry={!isPasswordVisible}
            onChangeText={handlePasswordChange}
            enableIcon
            iconImageSource={eyeIcon}
            autoCapitalize="none"
            accessibilityLabel={passwordPlaceholder}
            onFocus={() => {
              setPasswordTooltipVisible(false);
            }}
            onIconPress={handleEyePress}
            {...passwordTextInputProps}
          />
        </View>
      )
    );
  }, [
    isPasswordVisible,
    disablePasswordInput,
    disablePasswordTooltip,
    isPasswordTooltipVisible,
    passwordTooltipContent,
    passwordPlaceholder,
    handlePasswordChange,
    handleEyePress,
    passwordTextInputProps,
    setPasswordTooltipVisible,
  ]);

  const renderTextInputContainer = React.useCallback(
    () =>
      customTextInputs || (
        <View style={[styles.textInputContainer, textInputContainerStyle]}>
          {renderEmailInput()}
          {renderPasswordInput()}
          {textInputChildren}
        </View>
      ),
    [
      customTextInputs,
      textInputContainerStyle,
      renderEmailInput,
      renderPasswordInput,
      textInputChildren,
    ],
  );

  const renderLoginButton = React.useCallback(
    () =>
      customLoginButton || (
        <TouchableComponent
          style={[
            styles.loginButtonStyle,
            { width: screenWidth * 0.9 },
            loginButtonStyle,
          ]}
          accessibilityRole="button"
          accessibilityLabel={loginButtonText}
          onPress={() => {
            handleEmailValidation();
            onLoginPress?.();
          }}
        >
          <Text style={[styles.loginTextStyle, loginTextStyle]}>
            {loginButtonText}
          </Text>
        </TouchableComponent>
      ),
    [
      customLoginButton,
      TouchableComponent,
      screenWidth,
      loginButtonStyle,
      loginButtonText,
      loginTextStyle,
      handleEmailValidation,
      onLoginPress,
    ],
  );

  const renderSignUp = React.useCallback(
    () =>
      customSignupButton ||
      (!disableSignup && (
        <TouchableComponent
          style={[styles.signupStyle, signupStyle]}
          accessibilityRole="button"
          accessibilityLabel={signupText}
          onPress={onSignupPress}
        >
          <Text style={[styles.signupTextStyle, signupTextStyle]}>
            {signupText}
          </Text>
        </TouchableComponent>
      )),
    [
      customSignupButton,
      disableSignup,
      TouchableComponent,
      signupStyle,
      signupText,
      signupTextStyle,
      onSignupPress,
    ],
  );

  const renderDivider = React.useCallback(
    () =>
      customDivider ||
      (!disableDivider && (
        <View
          style={[
            styles.dividerStyle,
            { width: screenWidth * 0.8 },
            dividerStyle,
          ]}
        />
      )),
    [customDivider, disableDivider, screenWidth, dividerStyle],
  );

  const renderDefaultSocialLoginButtons = React.useCallback(
    () =>
      !disableSocialButtons ? (
        <>
          <SocialButton
            text="Continue with Facebook"
            TouchableComponent={TouchableComponent}
            textStyle={styles.facebookSocialButtonTextStyle}
            onPress={onFacebookPress}
          />
          <SocialButton
            text="Continue with Twitter"
            style={styles.socialButtonStyle}
            TouchableComponent={TouchableComponent}
            textStyle={styles.twitterSocialButtonTextStyle}
            imageSource={require("./local-assets/twitter.png")}
            onPress={onTwitterPress}
          />
          <SocialButton
            text="Continue with Apple"
            style={styles.socialButtonStyle}
            TouchableComponent={TouchableComponent}
            imageSource={require("./local-assets/apple.png")}
            onPress={onApplePress}
          />
          <SocialButton
            text="Continue with Discord"
            style={styles.socialButtonStyle}
            TouchableComponent={TouchableComponent}
            textStyle={styles.discordSocialButtonTextStyle}
            imageSource={require("./local-assets/discord.png")}
            onPress={onDiscordPress}
          />
        </>
      ) : null,
    [
      disableSocialButtons,
      TouchableComponent,
      onFacebookPress,
      onTwitterPress,
      onApplePress,
      onDiscordPress,
    ],
  );

  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle="dark-content" />
      {renderLogo()}
      {renderTextInputContainer()}
      {renderLoginButton()}
      {renderSignUp()}
      {renderDivider()}
      <View style={styles.socialLoginContainer}>
        {customSocialLoginButtons || renderDefaultSocialLoginButtons()}
      </View>
      {children}
    </SafeAreaView>
  );
};

export default React.memo(LoginScreen);
