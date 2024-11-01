import { ApiError } from "./ApiError";

export type ResponseWrapper<T> = {
    success: boolean;
    result: T;
    error: ApiError;
  };