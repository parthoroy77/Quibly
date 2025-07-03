export function parseTimeToDate(time: string): Date {
  const timePattern = /^(\d+)(d|h|min|s)$/;
  const match = time.match(timePattern);

  if (!match) {
    throw new Error("Invalid time format. Use '1d', '1h', '30min', '20s', etc.");
  }

  const value = parseInt(match[1] as string);
  const unit = match[2];

  let milliseconds;

  switch (unit) {
    case "d":
      milliseconds = value * 24 * 60 * 60 * 1000; // Convert days to milliseconds
      break;
    case "h":
      milliseconds = value * 60 * 60 * 1000; // Convert hours to milliseconds
      break;
    case "min":
      milliseconds = value * 60 * 1000; // Convert minutes to milliseconds
      break;
    case "s":
      milliseconds = value * 1000; // Convert seconds to milliseconds
      break;
    default:
      throw new Error("Unsupported time unit");
  }

  return new Date(Date.now() + milliseconds);
}
