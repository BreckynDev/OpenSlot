import { useState } from "react";
import { useNavigate } from "react-router-dom";

const logo_path = "/logo.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) return;
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) throw new Error("Failed to login");

      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8F9F5] flex items-center justify-center p-4">
      <img
        src={logo_path}
        alt="OpenSlot logo"
        className="fixed top-4 left-4 h-10 w-auto"
      />
      <span className="fixed top-6 left-14 text-[#2D312E] font-medium text-[15px]">
        Open
      </span>
      <span className="fixed top-6 left-24 text-[#A6DB24] font-medium text-[15px]">
        Slot
      </span>
      <div className="w-[420px] max-w-full bg-white border border-[#e4e6e0] rounded-2xl p-8 font-sans">
        <span className="text-[#2D312E] font-medium text-[24px]">
          Sign in to your account
        </span>
        <p className="text-[#7a8070]] font-medium text-[10px]">Owners Portal</p>
        <div className="mb-4 mt-4">
          <p className="block text-xs font-medium text-[#7a8070] mb-1.5 tracking-wide">
            Email
          </p>
          <input
            type="text"
            placeholder="username@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#e4e6e0] rounded-lg text-[#2D312E] placeholder-[#c8ccc4] focus:outline-none focus:border-[#3D5A42]"
          />
        </div>
        <div className="mb-4">
          <p className="block text-xs font-medium text-[#7a8070] mb-1.5 tracking-wide">
            Password
          </p>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#e4e6e0] rounded-lg text-[#2D312E] placeholder-[#c8ccc4] focus:outline-none focus:border-[#3D5A42]"
          />
        </div>
        <div className="flex item-center">
          <button
            onClick={handleSubmit}
            className="w-full flex item-center justify-center mb-4 px-3 py-3 bg-[#3D5A42] rounded-xl text-sm font-medium text-white hover:bg-[#344e38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sign in
          </button>
        </div>
        <p className="text-center text-xs text-[#7a8070] mt-2">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#3D5A42] font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
