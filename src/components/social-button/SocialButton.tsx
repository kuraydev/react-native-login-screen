import * as React from "react";
import {
  View,
  Image,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  ImageSourcePropType,
  useWindowDimensions,
  AccessibilityRole,
} from "react-native";
/**
 * ? Local Imports
 */
import styles from "./SocialButton.style";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
type CustomImageStyleProp =
  | StyleProp<ImageStyle>
  | Array<StyleProp<ImageStyle>>;
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;

export type TouchableComponentType = React.ComponentType<
  React.PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    accessibilityRole?: AccessibilityRole;
    accessibilityLabel?: string;
  }>
>;

export interface ISocialButtonProps {
  text: string;
  style?: CustomStyleProp;
  textStyle?: CustomTextStyleProp;
  imageSource?: ImageSourcePropType;
  textContainerStyle?: CustomStyleProp;
  iconImageStyle?: CustomImageStyleProp;
  TouchableComponent?: TouchableComponentType;
  onPress: () => void;
}

const SocialButton: React.FC<ISocialButtonProps> = ({
  style,
  text,
  textStyle,
  iconImageStyle,
  textContainerStyle,
  TouchableComponent = TouchableOpacity,
  imageSource = require("../../local-assets/facebook.png"),
  onPress,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <TouchableComponent
      style={[
        styles.container,
        { width: screenWidth * 0.9, paddingLeft: screenWidth * 0.2 },
        style,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={text}
    >
      <Image
        resizeMode="contain"
        source={imageSource}
        style={[styles.iconImageStyle, iconImageStyle]}
      />
      <View style={[styles.textContainer, textContainerStyle]}>
        <Text style={[styles.textStyle, textStyle]}>{text}</Text>
      </View>
    </TouchableComponent>
  );
};

export default SocialButton;
