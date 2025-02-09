export function validatePassword(password) {
  // Regular expressions to match the conditions
  const hasSixCharacters = /.{6,}/
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/
  const hasNumber = /\d/

  // Check all conditions
  if (
    hasSixCharacters.test(password) &&
    hasSpecialCharacter.test(password) &&
    hasNumber.test(password)
  ) {
    return true // Password is valid
  } else {
    return false // Password is invalid
  }
}
