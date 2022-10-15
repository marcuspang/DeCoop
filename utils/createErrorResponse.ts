const createErrorResponse = (message: string, description?: string) => ({
  message,
  description,
});

export default createErrorResponse;
