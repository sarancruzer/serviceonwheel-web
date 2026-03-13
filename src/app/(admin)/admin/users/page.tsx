const userSegments = [
  "New providers waiting for compliance review",
  "Customers with repeated cancellations",
  "High-value repeat customers across top cities",
] as const;

export default function AdminUsersPage() {
  return (
    <div className="sow-workspace">
      <section className="sow-workspace-panel">
        <p className="sow-workspace-panel__eyebrow">Users</p>
        <h2 className="mb-2">Monitor customer and provider cohorts</h2>
        <p className="text-muted mb-0">
          Admin-only menus can point to governance and operations screens
          without leaking those entries into customer navigation.
        </p>
      </section>

      <section className="sow-workspace-card">
        <ul className="sow-workspace-list">
          {userSegments.map((segment) => (
            <li key={segment}>{segment}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
