import * as React from "react";
import { Platform, LayoutAnimation } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "../LoginScreen";

const logo = 1 as never; // numeric require() handle stands in for an asset source

const noop = () => {};

const baseProps = {
  logoImageSource: logo,
  onLoginPress: noop,
  onSignupPress: noop,
  onEmailChange: noop,
  onPasswordChange: noop,
};

describe("LoginScreen on react-native-web (Platform.OS === 'web')", () => {
  const originalOS = Platform.OS;

  beforeAll(() => {
    Platform.OS = "web";
  });

  afterAll(() => {
    Platform.OS = originalOS;
  });

  it("renders without throwing under a web platform", () => {
    expect(() => render(<LoginScreen {...baseProps} />)).not.toThrow();
  });

  it("still surfaces the email tooltip on web but skips native LayoutAnimation", () => {
    const springSpy = jest.spyOn(LayoutAnimation, "spring");

    const { getByLabelText, getByPlaceholderText, queryByText } = render(
      <LoginScreen {...baseProps} />,
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "not-an-email");
    fireEvent.press(getByLabelText("Login"));

    // Graceful degradation: tooltip behavior is preserved on web...
    expect(queryByText(/doesn't look right/)).toBeTruthy();
    // ...without invoking LayoutAnimation, which react-native-web does not implement.
    expect(springSpy).not.toHaveBeenCalled();

    springSpy.mockRestore();
  });
});
