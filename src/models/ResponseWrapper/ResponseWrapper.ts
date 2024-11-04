export type ResponseWrapper<T> = {
    success: boolean;
    result: T;
  };