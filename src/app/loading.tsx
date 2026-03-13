export default function RootLoading() {
  return (
    <main className="container py-5">
      <div className="d-flex align-items-center gap-3 text-muted">
        <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        <span>Loading ServiceOnWheel...</span>
      </div>
    </main>
  );
}
