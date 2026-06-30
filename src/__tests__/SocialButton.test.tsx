import * as React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SocialButton from "../components/social-button/SocialButton";

describe("SocialButton", () => {
  it("renders its text and exposes a button accessibility label", () => {
    const { getByText, getByLabelText } = render(
      <SocialButton text="Continue with Apple" onPress={() => {}} />,
    );
    expect(getByText("Continue with Apple")).toBeTruthy();
    expect(getByLabelText("Continue with Apple")).toBeTruthy();
  });

  it("fires onPress when tapped", () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <SocialButton text="Continue with Facebook" onPress={onPress} />,
    );
    fireEvent.press(getByLabelText("Continue with Facebook"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
