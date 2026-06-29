// Credits: https://stackoverflow.com/a/52093032/2247055
// Minimum six characters, at least one letter and one number:
export const patternNormal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

// Minimum eight characters, at least one letter, one number and one special character:
export const patternMedium =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
export const patternHigh =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Password Validator
export default function passwordValidator(
  password: string,
  passwordRegEx: RegExp = patternNormal,
): boolean {
  if (!password) {
    return false;
  }

  return passwordRegEx.test(password);
}
