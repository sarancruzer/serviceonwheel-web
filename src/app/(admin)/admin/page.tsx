const adminMetrics = [
  { label: "Providers Awaiting Review", value: "14" },
  { label: "Daily Active Customers", value: "1,284" },
  { label: "Open Escalations", value: "05" },
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="sow-workspace">
      <section className="sow-workspace-panel">
        <p className="sow-workspace-panel__eyebrow">Admin Dashboard</p>
        <h2 className="mb-2">Marketplace operations in one workspace</h2>
        <p className="text-muted mb-0">
          Admin routes now sit on their own post-login shell, which keeps
          operational menus and governance controls fully separated from
          customer UX.
        </p>
      </section>

      <section className="sow-workspace-grid">
        {adminMetrics.map((item) => (
          <article key={item.label} className="sow-workspace-card">
            <p className="sow-workspace-card__label">{item.label}</p>
            <h3>{item.value}</h3>
          </article>
        ))}
      </section>
    </div>
  );
}
