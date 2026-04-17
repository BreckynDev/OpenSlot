import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PublicFlow from "./PublicFlow";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Booking Path */}
        <Route path="/book" element={<PublicFlow />} />

        {/* Auth Paths for Business Owners */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Dashboard Placeholder */}
        <Route
          path="/dashboard"
          element={<div>Owner Dashboard (Coming Soon)</div>}
        />

        {/* Redirect unknown routes to the booking page */}
        <Route path="*" element={<Navigate to="/book" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
