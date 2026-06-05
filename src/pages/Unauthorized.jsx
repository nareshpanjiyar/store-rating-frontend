import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-6xl font-bold">403</h1>

      <p className="mt-4">Access Denied</p>

      <Link to="/login" className="mt-6 bg-blue-600 px-6 py-3 rounded">
        Go To Login
      </Link>
    </div>
  );
}
