import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // basic validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    const res = await register({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    if (res.ok) {
      const isAdmin =
        !!res.user?.isAdmin ||
        (Array.isArray(res.user?.roles) &&
          res.user.roles.some((r) => r?.name === "admin"));
      navigate(isAdmin ? "/dashboard" : "/");
    } else {
      setError(res.error || "Registration failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="text-center mb-4">
            <h1 className="h3 fw-semibold text-success">Create Account</h1>
            <p className="text-muted mb-0">Join Learn 4 Sudan today</p>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12">
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

                  <div className="col-12 d-grid">
                    <button type="submit" className="btn btn-success">
                      Register
                    </button>
                  </div>
                </div>
              </form>

              <div className="text-center mt-3">
                <span className="text-muted me-1">
                  Already have an account?
                </span>
                <a href="/login" className="link-success text-decoration-none">
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
