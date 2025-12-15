export function AppointmentForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, time });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button disabled={loading}>Save</button>
    </form>
  );
}