export function toKebabCase(input: string) {
  return input
    .trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

export function toSnakeCase(input: string) {
  return input.trim().toLowerCase().replace(/\s+/g, "_");
}

export function toCamelCase(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/(?:^\w|\s\w)/g, (match) => match.trim().toUpperCase())
    .replace(/\s+/g, "")
    .replace(/^\w/, (char) => char.toLowerCase());
}
export function toPascalCase(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/(?:^\w|\s\w)/g, (match) => match.trim().toUpperCase())
    .replace(/\s+/g, "");
}
export function toTitleCase(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
export function toSentenceCase(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/^\w/, (char) => char.toUpperCase());
}

export function toNormalCase(str: string) {
  return str.replace(/[_-]/g, " ").replace(/\s+/g, " ").trim();
}
