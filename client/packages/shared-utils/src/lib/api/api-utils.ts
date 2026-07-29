export function getStatusCodeFromApiError(error: unknown) {
  if (error instanceof Error) {
    const errorMessage = error.message;

    const status = errorMessage.split('-')[0];

    return Number(status);
  }

  return NaN;
}
