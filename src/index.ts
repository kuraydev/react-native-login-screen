import LoginScreen from "./LoginScreen";
import SocialButton from "./components/social-button/SocialButton";
import emailValidator from "./helpers/emailValidator";
import passwordValidator from "./helpers/passwordValidator";

export default LoginScreen;
export { SocialButton, emailValidator, passwordValidator };
export {
  patternNormal,
  patternMedium,
  patternHigh,
} from "./helpers/passwordValidator";

export type { ILoginScreenProps } from "./LoginScreen";
export type {
  ISocialButtonProps,
  TouchableComponentType,
} from "./components/social-button/SocialButton";
