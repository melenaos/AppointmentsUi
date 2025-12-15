import {config} from '~/config'

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

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Request failed");
  }

  return res.json() as Promise<T>;
}
