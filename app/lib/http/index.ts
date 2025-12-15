import {config} from '~/config'
import { HttpError } from './HttpError';

/**
 * Centralized HTTP client for the application.
 *
 * All HTTP requests in this application MUST go through this function.
 * Do NOT use `fetch` directly anywhere else.
 *
 * The server base URL is automatically applied to all relative requests
 * 
 * Usage:
 *   http<T>("/api/resource");
 *   http<T>("/api/resource", { method: "POST", body: JSON.stringify(data) });
 */
export async function http<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {

  // prepend Server url if missing
  const url =
    typeof input === "string" && !input.startsWith("http")
    ? `${config.serverUrl}${input.startsWith("/") ? "" : "/"}${input}`
    : input;


  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  // If the response is not ok, try to parse the response body
  if (!res.ok) {
    let errorBody: unknown = null;

    try {
      errorBody = await res.json(); 
    } catch {
      errorBody = await res.text();
    }
    // and throw it as an error
    throw new HttpError(res.status, errorBody);
  }

  return res.json() as Promise<T>;
}
