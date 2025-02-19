import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLoginForm from "./admin/AdminLoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboard from "./user/UserDashboard";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginForm />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
