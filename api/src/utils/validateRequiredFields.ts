export function validateRequiredFields<T extends Record<string, unknown>>(fields: T): (keyof T)[] {
  return Object.entries(fields)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value === undefined || value === null || value === '')
    .map(([key]) => key);
}
