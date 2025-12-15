import type { ValidationError } from "~/types/ValidationError";
import { HttpError } from "./HttpError";

export type ApiError = {
  errors: ValidationError[];
};

