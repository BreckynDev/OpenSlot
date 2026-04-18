import { useState } from "react";
import { useNavigate } from "react-router-dom";

const logo_path = "/logo.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9F5] flex items-center justify-center p-4">
      <div className="w-[420px] max-w-full bg-white border border-[#e4e6e0] rounded-2xl p-8 font-sans">
        <img src={logo_path} alt="OpenSlot logo" className="h-7 w-auto" />
        <span className="text-[#2D312E] font-medium text-[15px]">OpenSlot</span>
        <span className="text-[#2D312E] font-medium text-[15px]">Login</span>
        <p className="text-[#2D312E] font-medium text-[12px]">
          Owners Portal | Sign in to manage your bookings
        </p>
        <div className="mb-4 mt-4">
          <p className="block text-xs font-medium text-[#7a8070] mb-1.5 tracking-wide">
            Username
          </p>
          <input
            type="text"
            placeholder="username@email.com"
            className="w-full px-3 py-2.5 text-sm border border-[#e4e6e0] rounded-lg text-[#2D312E] placeholder-[#c8ccc4] focus:outline-none focus:border-[#3D5A42]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p className="block text-xs font-medium text-[#7a8070] mb-1.5 tracking-wide">
            Password
          </p>
          <input
            type="password"
            placeholder="password"
            className="w-full px-3 py-2.5 text-sm border border-[#e4e6e0] rounded-lg text-[#2D312E] placeholder-[#c8ccc4] focus:outline-none focus:border-[#3D5A42]"
          />
        </div>
        <div className="flex item-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex item-center justify-center mb-4 px-3 py-3 bg-[#3D5A42] rounded-xl text-sm font-medium text-white hover:bg-[#344e38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </div>
        <div className="flex item-center">
          <button
            onClick={() => navigate("/register")}
            className="w-full flex item-center justify-center mb-4 px-3 py-3 bg-[#3D5A42] rounded-xl text-sm font-medium text-white hover:bg-[#344e38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
