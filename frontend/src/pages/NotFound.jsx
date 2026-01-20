import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="mb-3 text-3xl font-semibold text-gray-800">404</h1>
      <p className="mb-6 text-gray-600">Page not found.</p>
      <Link
        to="/"
        className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
      >
        Go Home
      </Link>
    </div>
  );
}
