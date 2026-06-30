import { LayoutAnimation, Platform } from "react-native";

/**
 * react-native-web does not implement `LayoutAnimation`. Calling
 * `LayoutAnimation.spring()` / `configureNext` there throws or logs a warning,
 * which breaks the tooltip flow on web. We no-op on web only, so the native
 * (iOS/Android) animation behavior stays byte-for-byte unchanged.
 */
const springLayoutAnimation = (): void => {
  if (Platform.OS === "web") {
    return;
  }
  LayoutAnimation.spring();
};

export default springLayoutAnimation;
