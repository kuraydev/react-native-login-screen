import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
/**
 * ? Local Imports
 */
import styles from "./Tooltip.style";

interface TooltipProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ style, children }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
      <View style={styles.arrow} />
    </View>
  );
};

export default Tooltip;
