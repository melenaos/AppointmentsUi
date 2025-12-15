export class HttpError<T = unknown> extends Error {
  constructor(
    public status: number,
    public data: T
  ) {
    super(`HTTP ${status}`);
  }
}