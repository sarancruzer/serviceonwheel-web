const bookings = [
  { provider: "Apex Cleaning", slot: "Mar 15, 10:00 AM", status: "Confirmed" },
  {
    provider: "QuickFix Electric",
    slot: "Mar 17, 02:30 PM",
    status: "Pending",
  },
  {
    provider: "Urban Plumbing Co.",
    slot: "Mar 19, 11:15 AM",
    status: "Completed",
  },
] as const;

export default function CustomerBookingsPage() {
  return (
    <div className="sow-workspace">
      <section className="sow-workspace-panel">
        <p className="sow-workspace-panel__eyebrow">Bookings</p>
        <h2 className="mb-2">Upcoming and past service appointments</h2>
        <p className="text-muted mb-0">
          Customer menus can now point to dedicated post-login sections instead
          of reusing public landing pages.
        </p>
      </section>

      <section className="sow-workspace-card">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Scheduled Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={`${booking.provider}-${booking.slot}`}>
                  <td>{booking.provider}</td>
                  <td>{booking.slot}</td>
                  <td>
                    <span className="sow-status-pill">{booking.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
