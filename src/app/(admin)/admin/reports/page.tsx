const reports = [
  { name: "Revenue Summary", value: "$24.8K this week" },
  { name: "Booking Conversion", value: "18.2% across search traffic" },
  { name: "Provider SLA", value: "92% within target response time" },
] as const;

export default function AdminReportsPage() {
  return (
    <div className="sow-workspace">
      <section className="sow-workspace-panel">
        <p className="sow-workspace-panel__eyebrow">Reports</p>
        <h2 className="mb-2">Performance and marketplace reporting</h2>
        <p className="text-muted mb-0">
          Separate admin reporting routes make role-based menus explicit and
          keep the authorization surface easy to reason about.
        </p>
      </section>

      <section className="sow-workspace-grid">
        {reports.map((report) => (
          <article key={report.name} className="sow-workspace-card">
            <p className="sow-workspace-card__label">{report.name}</p>
            <h4 className="mb-0">{report.value}</h4>
          </article>
        ))}
      </section>
    </div>
  );
}
