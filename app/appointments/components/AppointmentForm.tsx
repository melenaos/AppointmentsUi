import type { CreateAppointment } from "../types";

export function AppointmentForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: CreateAppointment) => void;
  loading: boolean;
}) {
  return (
    <div className="container mx-auto max-w-lg my-10">
      <form>
        <fieldset>
          <div className="mb-5 lg:mb-8 text-center">
            <h2>Appointments</h2>
            <p className="text-lg">Create a new appointment</p>
          </div>

          <div className="form-element">
            <label className="form-element-label" htmlFor="customerName">
              Customer name
            </label>

            <input
              className="form-element-input"
              type="text"
              name="customerName"
              id="customerName"
              required
            />
          </div>

          <div className="form-element">
            <label className="form-element-label" htmlFor="datetime">
              Date and time
            </label>

            <input
              className="form-element-input"
              type="text"
              name="datetime"
              id="datetime"
              required
            />
          </div>

          <div className="form-element">
            <label className="form-element-label" htmlFor="Duration">
              Duration
            </label>

            <input
              className="form-element-input"
              type="number"
              name="Duration"
              id="Duration"
              required
            />
          </div>
        </fieldset>

        <div className="text-right">
          <button
            onClick={() =>
              onSubmit({
                AppointmentTime: "2026-01-01",
                ServiceDurationMinutes: 30,
                ClientName: "Menelaos Vergis",
              })
            }
            className="btn"
          >
            {loading ? "Saving..." : "Create appointment"}
          </button>
        </div>
      </form>
    </div>
  );
}
