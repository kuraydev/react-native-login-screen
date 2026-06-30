import * as React from "react";
import { Text } from "react-native";
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

describe("LoginScreen", () => {
  it("renders the default login button, signup link and social buttons", () => {
    const { getByText, queryByText } = render(<LoginScreen {...baseProps} />);

    expect(getByText("Login")).toBeTruthy();
    expect(getByText("Create an account")).toBeTruthy();
    expect(getByText("Continue with Facebook")).toBeTruthy();
    expect(getByText("Continue with Twitter")).toBeTruthy();
    expect(getByText("Continue with Apple")).toBeTruthy();
    expect(getByText("Continue with Discord")).toBeTruthy();
    expect(queryByText("Sign in")).toBeNull();
  });

  it("honors loginButtonText, signupText and placeholders overrides", () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen
        {...baseProps}
        loginButtonText="Sign in"
        signupText="Register"
        emailPlaceholder="Your email"
        passwordPlaceholder="Your password"
      />,
    );

    expect(getByText("Sign in")).toBeTruthy();
    expect(getByText("Register")).toBeTruthy();
    expect(getByPlaceholderText("Your email")).toBeTruthy();
    expect(getByPlaceholderText("Your password")).toBeTruthy();
  });

  it("hides the signup link when disableSignup is set", () => {
    const { queryByText } = render(
      <LoginScreen {...baseProps} disableSignup />,
    );
    expect(queryByText("Create an account")).toBeNull();
  });

  it("hides all social buttons when disableSocialButtons is set", () => {
    const { queryByText } = render(
      <LoginScreen {...baseProps} disableSocialButtons />,
    );
    expect(queryByText("Continue with Facebook")).toBeNull();
    expect(queryByText("Continue with Discord")).toBeNull();
  });

  it("omits the password input when disablePasswordInput is set", () => {
    const { queryByPlaceholderText } = render(
      <LoginScreen {...baseProps} disablePasswordInput />,
    );
    expect(queryByPlaceholderText("Password")).toBeNull();
    expect(queryByPlaceholderText("Email")).toBeTruthy();
  });

  it("calls onEmailChange and onPasswordChange while typing", () => {
    const onEmailChange = jest.fn();
    const onPasswordChange = jest.fn();
    const { getByPlaceholderText } = render(
      <LoginScreen
        {...baseProps}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
      />,
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "secret123");

    expect(onEmailChange).toHaveBeenCalledWith("john@example.com");
    expect(onPasswordChange).toHaveBeenCalledWith("secret123");
  });

  it("invokes onLoginPress when the login button is pressed", () => {
    const onLoginPress = jest.fn();
    const { getByLabelText } = render(
      <LoginScreen {...baseProps} onLoginPress={onLoginPress} />,
    );

    fireEvent.press(getByLabelText("Login"));
    expect(onLoginPress).toHaveBeenCalledTimes(1);
  });

  it("invokes onSignupPress when the signup link is pressed", () => {
    const onSignupPress = jest.fn();
    const { getByText } = render(
      <LoginScreen {...baseProps} onSignupPress={onSignupPress} />,
    );

    fireEvent.press(getByText("Create an account"));
    expect(onSignupPress).toHaveBeenCalledTimes(1);
  });

  it("shows the email tooltip after pressing login with an invalid email", () => {
    const { getByLabelText, getByPlaceholderText, queryByText } = render(
      <LoginScreen {...baseProps} />,
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "not-an-email");
    expect(queryByText(/doesn't look right/)).toBeNull();

    fireEvent.press(getByLabelText("Login"));
    expect(queryByText(/doesn't look right/)).toBeTruthy();
  });

  it("does not show the email tooltip for a valid email", () => {
    const { getByLabelText, getByPlaceholderText, queryByText } = render(
      <LoginScreen {...baseProps} />,
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.press(getByLabelText("Login"));
    expect(queryByText(/doesn't look right/)).toBeNull();
  });

  it("renders a custom login button when provided", () => {
    const { getByText, queryByText } = render(
      <LoginScreen
        {...baseProps}
        customLoginButton={<Text>Custom CTA</Text>}
      />,
    );
    expect(getByText("Custom CTA")).toBeTruthy();
    expect(queryByText("Login")).toBeNull();
  });
});
