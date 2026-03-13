"use client";

export default function RootError() {
  return (
    <main className="container py-5">
      <div className="alert alert-danger mb-0" role="alert">
        The application hit an unexpected error. Refresh the page or try again.
      </div>
    </main>
  );
}
