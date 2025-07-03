export function generateUniqueId(prefix?: string): string {
  const randomPart = Math.random().toString(36).substring(2, 12).toUpperCase(); // Random string
  const timestampPart = Date.now().toString(36).toUpperCase(); // Timestamp in base 36
  const uniquePart = `${randomPart}${timestampPart}`; // Combine both parts

  if (prefix) {
    return `${prefix}${uniquePart}`;
  } else {
    return uniquePart;
  }
}
