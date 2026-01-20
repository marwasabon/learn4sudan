import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    const res = await login({ email, password });
    if (res.ok) {
      const isAdmin =
        !!res.user?.isAdmin ||
        (Array.isArray(res.user?.roles) &&
          res.user.roles.some((r) => r?.name === "admin"));
      navigate(isAdmin ? "/dashboard" : "/");
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="text-center mb-4">
            <h1 className="h3 fw-semibold text-success">Sign In</h1>
            <p className="text-muted mb-0">Welcome back to Learn 4 Sudan</p>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit} className="gy-3">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="d-flex align-items-center justify-content-between gap-3">
                  <button type="submit" className="btn btn-success w-100">
                    Login
                  </button>
                </div>
              </form>

              <div className="text-center mt-3">
                <span className="text-muted me-1">No account?</span>
                <a
                  href="/register"
                  className="link-success text-decoration-none"
                >
                  Create one
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
