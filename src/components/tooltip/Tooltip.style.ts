import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    top: -60,
    position: "absolute",
    zIndex: 99,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 0,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  arrow: {
    top: 10,
    alignSelf: "center",
    borderTopWidth: 10,
    borderTopColor: "#fff",
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    height: 0,
    width: 0,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
});
