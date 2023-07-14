export const success = (message: string, data: object | Array<unknown> | null, statusCode: number) => {
  return {
    message,
    error: false,
    code: statusCode,
    data,
  };
};

export const error = (message: string | Array<unknown>, statusCode: number) => {
  return {
    message,
    code: statusCode,
    error: true,
  };
};

export const validation = (errors: object | Array<unknown>) => {
  return {
    message: "Validation errors",
    error: true,
    code: 422,
    errors,
  };
};
