export function validateAllNumber(input) {
  return /^(?:\d{10}|\d{13})$/.test(input);
}