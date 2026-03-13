export default function CustomerProfilePage() {
  return (
    <div className="sow-workspace">
      <section className="sow-workspace-panel">
        <p className="sow-workspace-panel__eyebrow">Profile</p>
        <h2 className="mb-2">Customer identity and booking preferences</h2>
        <p className="text-muted mb-0">
          Personal settings live inside the customer shell, which keeps menu
          logic and permissions aligned with the end-user experience.
        </p>
      </section>

      <section className="sow-workspace-split">
        <article className="sow-workspace-card">
          <h5 className="mb-3">Saved Preferences</h5>
          <ul className="sow-workspace-list">
            <li>Preferred booking window: Weekday afternoons</li>
            <li>Default service city: Chennai</li>
            <li>Communication mode: WhatsApp and email</li>
          </ul>
        </article>

        <article className="sow-workspace-card">
          <h5 className="mb-3">Why this matters</h5>
          <p className="text-muted mb-0">
            This route is now cleanly separated from admin workflows, so future
            customer-only profile modules can ship without touching admin
            chrome.
          </p>
        </article>
      </section>
    </div>
  );
}
