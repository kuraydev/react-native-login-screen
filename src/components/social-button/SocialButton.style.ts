import { ViewStyle, StyleSheet, ImageStyle, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  iconImageStyle: ImageStyle;
  textContainer: ViewStyle;
  textStyle: TextStyle;
}

export default StyleSheet.create<Style>({
  container: {
    height: 45,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#e9eef4",
  },
  iconImageStyle: {
    width: 20,
    height: 20,
  },
  textContainer: {
    marginLeft: 16,
  },
  textStyle: {
    color: "#315092",
    fontWeight: "500",
  },
});
