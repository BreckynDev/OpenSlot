import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PublicFlow from "./PublicFlow";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import DashboardView from "./components/DashboardView";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Booking Path */}
        <Route path="/book" element={<PublicFlow />} />

        {/* Auth Paths for Business Owners */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Dashboard path */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardView />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes to the booking page */}
        <Route path="*" element={<Navigate to="/book" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
