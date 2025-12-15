import { useState } from "react";
import type { CreateAppointment } from "../types";
import type { ValidationError } from "~/types/ValidationError";

export function AppointmentForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: CreateAppointment) => void;
  loading: boolean;
}) {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const nextErrors: ValidationError[] = [];

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
        Code: "AppointmentCreate.ClientName.Missing",
        Message: "Client name is required",
      });
    }

    if (Number.isNaN(appointmentTime.getTime())) {
      nextErrors.push({
        Code: "AppointmentCreate.AppointmentTime.NotValidDate",
        Message: "Please enter a valid date and time",
      });
    }

    if (duration !== undefined && !Number.isFinite(duration)) {
      nextErrors.push({
        Code: "AppointmentCreate.Duration.NotValidNumber",
        Message: "Duration must be a number",
      });
    } else if (duration !== undefined && duration <= 0) {
      nextErrors.push({
        Code: "AppointmentCreate.Duration.InvalidNumber",
        Message: "Duration must be a positive number",
      });
    }

    // Don't stop submit, allow the server to return their own validation error
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
    return errors.filter((e) => e.Code.startsWith(prefix));
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
              <span key={error.Code} className="validation-message">
                {error.Message}
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
              <span key={error.Code} className="validation-message">
                {error.Message}
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
              // type="number" Commented it out just to test the local validation
              type="text"
              name="duration"
              id="duration"
            />

            {durationErrors.map((error) => (
              <span key={error.Code} className="validation-message">
                {error.Message}
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
