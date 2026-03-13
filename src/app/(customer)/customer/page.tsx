const overviewStats = [
  { label: "Active Bookings", value: "08" },
  { label: "Saved Providers", value: "21" },
  { label: "Open Requests", value: "03" },
] as const;

const nextSteps = [
  "Confirm two pending provider visits for this week.",
  "Review post-service feedback before the next booking cycle.",
  "Update saved locations for faster repeat bookings.",
] as const;

export default function CustomerDashboardPage() {
  return (
    <div className="sow-workspace">
      <section className="sow-workspace-panel">
        <p className="sow-workspace-panel__eyebrow">Customer Dashboard</p>
        <h2 className="mb-2">Your service activity at a glance</h2>
        <p className="text-muted mb-0">
          A focused space for end users to manage bookings, favorites, and
          profile preferences without mixing admin controls into the same
          layout.
        </p>
      </section>

      <section className="sow-workspace-grid">
        {overviewStats.map((item) => (
          <article key={item.label} className="sow-workspace-card">
            <p className="sow-workspace-card__label">{item.label}</p>
            <h3>{item.value}</h3>
          </article>
        ))}
      </section>

      <section className="sow-workspace-split">
        <article className="sow-workspace-card">
          <h5 className="mb-3">Next Actions</h5>
          <ul className="sow-workspace-list">
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </article>

        <article className="sow-workspace-card">
          <h5 className="mb-3">Layout Intent</h5>
          <p className="text-muted mb-0">
            This route group is isolated for customer journeys only. Menu items,
            future permissions, and customer-specific widgets can evolve here
            without creating admin-specific branches inside the public layout.
          </p>
        </article>
      </section>
    </div>
  );
}
