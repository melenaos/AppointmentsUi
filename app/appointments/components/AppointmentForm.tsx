import type { CreateAppointment } from "../types";

export function AppointmentForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: CreateAppointment) => void;
  loading: boolean;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const appointment: CreateAppointment = {
      ClientName: data.get("customerName") as string,
      AppointmentTime: new Date(data.get("datetime") as string).toISOString(),
      ServiceDurationMinutes: Number(data.get("Duration")),
    };

    onSubmit(appointment);
  }

  return (
    <div className="container mx-auto max-w-lg my-10">
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
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
            />
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
