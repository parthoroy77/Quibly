export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = error.message as string;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};
