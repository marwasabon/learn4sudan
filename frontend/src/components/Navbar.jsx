import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo" aria-label="Learn 4 Sudan home">
          <img
            src="/assets/images/logo.svg"
            alt="Learn 4 Sudan"
            className="logo-img"
          />
        </Link>
        <ul className="nav-links">
          {/* main  */}
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#programs">Programs</a>
          </li>
          <li>
            <a href="#quotes">Apply</a>
          </li>
          <li>
            <a href="#footer">Contact</a>
          </li>
          {/* SPA routes */}
        </ul>
        {user ? (
          <button className="btn-login" aria-label="Logout" onClick={logout}>
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "btn-login active" : "btn-login"
            }
            aria-label="Sign in"
          >
            Sign In
          </NavLink>
        )}
      </nav>
    </header>
  );
}
