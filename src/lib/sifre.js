export function sifreGucluMu(s) {
  return (
    typeof s === 'string' &&
    s.length >= 10 &&
    /[A-Za-z]/.test(s) &&
    /[0-9]/.test(s) &&
    /[^A-Za-z0-9]/.test(s)
  );
}
