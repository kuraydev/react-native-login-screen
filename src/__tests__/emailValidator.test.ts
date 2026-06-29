import emailValidator from "../helpers/emailValidator";

describe("emailValidator", () => {
  it("returns false for empty input", () => {
    expect(emailValidator("")).toBe(false);
  });

  it("accepts well-formed addresses", () => {
    expect(emailValidator("john.doe@example.com")).toBe(true);
    expect(emailValidator("a+b@sub.domain.co")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    expect(emailValidator("not-an-email")).toBe(false);
    expect(emailValidator("missing@domain")).toBe(false);
    expect(emailValidator("two@@at.com")).toBe(false);
    expect(emailValidator("space in@email.com")).toBe(false);
  });

  it("rejects an over-long local part (> 64 chars)", () => {
    const longLocal = `${"a".repeat(65)}@example.com`;
    expect(emailValidator(longLocal)).toBe(false);
  });
});
