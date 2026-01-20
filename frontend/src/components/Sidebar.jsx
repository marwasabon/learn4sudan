import { NavLink } from "react-router-dom";

export default function Sidebar({ collapsed = false, onToggle }) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-white border-end"
      style={{
        minHeight: "100vh",
        width: collapsed ? 64 : 260,
        transition: "width .2s ease",
      }}
    >
      <div className="px-3 py-3 border-bottom">
        <div className="d-flex align-items-center justify-content-between">
          <span className="fs-5 fw-semibold">{collapsed ? "" : "Menu"}</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            title={collapsed ? "Expand" : "Collapse"}
            type="button"
            onClick={onToggle}
          >
            {collapsed ? "≫" : "≪"}
          </button>
        </div>
      </div>

      <ul className="nav nav-pills flex-column mb-auto px-2 py-3">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-speedometer2 me-2"></i>
            {collapsed ? "" : "Home"}
          </NavLink>
        </li>

        <li className="mt-3 mb-1 px-2 text-muted small">
          {collapsed ? "" : "User & Role Management"}
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-people me-2"></i>
            {collapsed ? "" : "Users"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/roles"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-person-badge me-2"></i>
            {collapsed ? "" : "Roles"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-layers me-2"></i>
            {collapsed ? "" : "Categories"}
          </NavLink>
        </li>

        <li className="mt-3 mb-1 px-2 text-muted small">
          {collapsed ? "" : "Learning"}
        </li>
        <li>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-book me-2"></i>
            {collapsed ? "" : "Courses"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/programs"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-diagram-3 me-2"></i>
            {collapsed ? "" : "Programs"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="bi bi-ui-checks-grid me-2"></i>
            {collapsed ? "" : "Applications"}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
