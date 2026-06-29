import passwordValidator, {
  patternNormal,
  patternMedium,
  patternHigh,
} from "../helpers/passwordValidator";

describe("passwordValidator", () => {
  it("returns false for empty input", () => {
    expect(passwordValidator("")).toBe(false);
  });

  describe("default (normal) policy: >= 6 chars, one letter and one digit", () => {
    it("accepts a valid password", () => {
      expect(passwordValidator("abc123")).toBe(true);
    });

    it("rejects letters-only and digits-only passwords", () => {
      expect(passwordValidator("abcdef")).toBe(false);
      expect(passwordValidator("123456")).toBe(false);
    });

    it("rejects passwords shorter than six characters", () => {
      expect(passwordValidator("ab12")).toBe(false);
    });

    // Regression: the patterns previously used `\\d` (a literal backslash + "d")
    // instead of `\d`, so a real digit could never satisfy the policy.
    it("treats `\\d` as a digit class, not a literal backslash", () => {
      expect(patternNormal.test("abc123")).toBe(true);
      expect(patternNormal.source).toContain("\\d");
      expect(patternNormal.source).not.toContain("\\\\d");
    });
  });

  describe("medium policy", () => {
    it("requires a special character", () => {
      expect(passwordValidator("abcd1234", patternMedium)).toBe(false);
      expect(passwordValidator("abcd123!", patternMedium)).toBe(true);
    });
  });

  describe("high policy", () => {
    it("requires upper, lower, digit and special characters", () => {
      expect(passwordValidator("abcd123!", patternHigh)).toBe(false);
      expect(passwordValidator("Abcd123!", patternHigh)).toBe(true);
    });
  });
});
