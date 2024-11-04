
import { ApiError } from "../models/ApiError/ApiError";
import { ResponseWrapper } from "../models/ResponseWrapper/ResponseWrapper";

type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
  };

  export async function fetchWrapperGet<T>(input: string): Promise<ResponseWrapper<T>> {
    return fetchWrapper(input, { method: "GET" })
  }

  export async function fetchWrapperPost<T>(input: string, body: unknown = {}): Promise<ResponseWrapper<T>> {
    return fetchWrapper(input, { 
      method: "POST",
      body: body
    })
  }
  
  async function fetchWrapper<T>(input: string, options: FetchOptions = {}): Promise<ResponseWrapper<T>> {
    try {
      // fetch token from session storage
      // const user = JSON.parse(sessionStorage.getItem('data'));
      // const token = user.data.id;
      const response = await fetch(input, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          'x-authentication-token': 'borealis-fe-interview-token',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(data.message, data.cause);
      }

      const res: ResponseWrapper<T> = {
        success: true,
        result: data as T
      }
      return res;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

export default fetchWrapper;