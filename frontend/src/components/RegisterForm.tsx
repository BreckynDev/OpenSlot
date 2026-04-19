import { useState } from "react";
import { useNavigate } from "react-router-dom";

const logo_path = "/logo.png";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirmed] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirm) return;
    if (password != confirm) return;
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) throw new Error("Failed to Register Account");
      navigate("/login");
    } catch (error) {
      console.error("Registering error:", error);
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
          Create your account
        </span>
        <p className="text-[#7a8070] font-medium text-[10px]">Owners Portal</p>
        <div className="mb-4 mt-4">
          <p className="block text-xs font-medium text-[#7a8070] mb-1.5 tracking-wide">
            Business Name
          </p>
          <input
            type="text"
            placeholder="Business Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#e4e6e0] rounded-lg text-[#2D312E] placeholder-[#c8ccc4] focus:outline-none focus:border-[#3D5A42]"
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
          <p className="block text-xs font-medium text-[#7a8070] mb-1.5 tracking-wide">
            Confirm Password
          </p>
          <input
            type="password"
            placeholder="confirm password"
            value={confirm}
            onChange={(e) => setConfirmed(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#e4e6e0] rounded-lg text-[#2D312E] placeholder-[#c8ccc4] focus:outline-none focus:border-[#3D5A42]"
          />
        </div>
        <div className="flex item-center">
          <button
            onClick={handleSubmit}
            className="w-full flex item-center justify-center mb-4 px-3 py-3 bg-[#3D5A42] rounded-xl text-sm font-medium text-white hover:bg-[#344e38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </div>
        <p className="text-center text-xs text-[#7a8070] mt-2">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#3D5A42] font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
