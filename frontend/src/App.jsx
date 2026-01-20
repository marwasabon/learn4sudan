import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthOnlyRoute from "./components/AuthOnlyRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import RolesPage from "./pages/RolesPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import ProgramsPage from "./pages/ProgramsPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import ApplyPage from "./pages/ApplyPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          {/* public home routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
          </Route>
          {/*   allowed routes after auth */}
          <Route element={<AuthOnlyRoute />}>
            <Route path="/apply/:programId" element={<ApplyPage />} />
          </Route>

          {/* Public routes */}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
