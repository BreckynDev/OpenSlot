import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

type Page = "login" | "register" | "dashboard";

function PrivateFlow() {
  const [page, setPage] = useState<Page>("login");
  const [email, setUserEmail] = useState<string>("");

  const handleLoginSuccess = () => {
    setUserEmail(email);
    setPage("dashboard");
  };

  const handleGoToRegister = () => {
    setPage("register");
  };

  const handleRegister = () => {
    setPage("login");
  };

  return (
    <>
      {page === "login" && (
        <LoginForm
          onContinue={handleLoginSuccess}
          onGoToRegister={handleGoToRegister}
        />
      )}
      {page === "register" && <RegisterForm onRegister={handleRegister} />}
    </>
  );
}

export default PrivateFlow;
