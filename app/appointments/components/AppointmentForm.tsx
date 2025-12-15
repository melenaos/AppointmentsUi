import { useEffect, useState } from "react";
import type { CreateAppointment } from "../types";
import type { ValidationError } from "~/types/ValidationError";
import { type ApiError } from "~/lib/http/ApiError";

export function AppointmentForm({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (data: CreateAppointment) => void;
  loading: boolean;
  error: ApiError | null;
}) {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  // Check error coming from the server
  useEffect(() => {
    if (error && error.errors.length > 0) {
      setErrors(error.errors);
    }
  }, [error]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    var nextErrors: ValidationError[] = [];

    // Satinize data
    const clientName = data.get("clientName") as string;
    const appointmentTime = new Date(data.get("datetime") as string);
    const durationRaw = data.get("duration");
    const duration =
      durationRaw === null || durationRaw === ""
        ? undefined
        : Number(durationRaw);

    // Basic validation  (I should move this to a business layer)
    if (!clientName || clientName.trim() === "") {
      nextErrors.push({
        code: "AppointmentCreate.ClientName.Missing",
        message: "The client name is required.",
      });
    }

    if (Number.isNaN(appointmentTime.getTime())) {
      nextErrors.push({
        code: "AppointmentCreate.AppointmentTime.NotValidDate",
        message: "Please enter a valid date and time",
      });
    }

    if (duration !== undefined && !Number.isFinite(duration)) {
      nextErrors.push({
        code: "AppointmentCreate.Duration.NotValidNumber",
        message: "Duration must be a number",
      });
    } else if (duration !== undefined && duration <= 0) {
      nextErrors.push({
        code: "AppointmentCreate.Duration.InvalidNumber",
        message: "Duration must be greater than zero",
      });
    }

    // Don't stop submit, allow the server to return their own validation error
    // server response will override the errors (see useEffect)
    setErrors(nextErrors);

    // Create the request object and submit
    const appointment: CreateAppointment = {
      ClientName: clientName,
      AppointmentTime: appointmentTime.toISOString(),
      ServiceDurationMinutes: duration,
    };

    onSubmit(appointment);
  }

  function getFieldErrors(errors: ValidationError[], prefix: string) {
    return errors.filter((e) => e.code.startsWith(prefix));
  }

  const clientNameErrors = getFieldErrors(
    errors,
    "AppointmentCreate.ClientName"
  );
  const appointmentTimeErrors = getFieldErrors(
    errors,
    "AppointmentCreate.AppointmentTime"
  );
  const durationErrors = getFieldErrors(errors, "AppointmentCreate.Duration");

  return (
    <div className="container mx-auto max-w-lg my-10">
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <div className="mb-5 lg:mb-8 text-center">
            <h2>Appointments</h2>
            <p className="text-lg">Create a new appointment</p>
          </div>

          {/* ClientName */}
          <div className="form-element">
            <label className="form-element-label" htmlFor="clientName">
              Client name
            </label>

            <input
              className={`form-element-input ${
                clientNameErrors.length ? "validation-error" : ""
              }`}
              type="text"
              name="clientName"
              id="clientName"
              // required Commented it out just to test the local validation
            />

            {clientNameErrors.map((error) => (
              <span key={error.code} className="validation-message">
                {error.message}
              </span>
            ))}
          </div>

          {/* AppointmentTime */}
          <div className="form-element">
            <label className="form-element-label" htmlFor="datetime">
              Date and time
            </label>

            <input
              className={`form-element-input ${
                appointmentTimeErrors.length ? "validation-error" : ""
              }`}
              type="text"
              name="datetime"
              id="datetime"
              required
            />

            {appointmentTimeErrors.map((error) => (
              <span key={error.code} className="validation-message">
                {error.message}
              </span>
            ))}
          </div>

          {/* Duration */}
          <div className="form-element">
            <label className="form-element-label" htmlFor="duration">
              Duration
            </label>

            <input
              className={`form-element-input ${
                durationErrors.length ? "validation-error" : ""
              }`}
              type="number"
              name="duration"
              id="duration"
            />

            {durationErrors.map((error) => (
              <span key={error.code} className="validation-message">
                {error.message}
              </span>
            ))}
          </div>
        </fieldset>

        <div className="text-right">
          <button className="btn" disabled={loading}>
            {loading ? "Saving..." : "Create appointment"}
          </button>
        </div>
      </form>
    </div>
  );
}
