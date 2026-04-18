import { useState } from "react";

interface BookingFormProps {
  date: string;
  time: string;
  onBack: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    service: string;
    notes: string;
  }) => void;
}

const logo_path = "/public/logo.png";

const services = ["Manicure", "Pedicure", "Acrylic", "Gel", "Dip", "Nail art"];

const BookingForm = ({ date, time, onBack, onSubmit }: BookingFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !service) return;
    onSubmit({ name, email, service, notes });
  };

  return (
    <div className="min-h-screen bg-[#F8F9F5] flex items-center justify-center p-4">
      <div className="w-[420px] max-w-full bg-white border border-[#e4e6e0] rounded-2xl p-8 font-sans">
        <div className="flex items-center gap-2 mb-3">
          <img src={logo_path} alt="OpenSlot logo" className="h-7 w-auto" />
          <span className="text-[#2D312E] font-medium text-[15px]">
            OpenSlot
          </span>
        </div>
        <p className="text-xs text-[#7a8070] mb-6">
          {date} &middot; {time}
        </p>

        <hr className="border-[#e4e6e0] mb-6" />

        <h3 className="text-base font-medium text-[#2D312E] mb-1">
          Your details
        </h3>
        <p className="text-sm text-[#7a8070] mb-5">
          We'll send a confirmation to your email.
        </p>

        <div className="mb-4">
          <label className="block text-xs font-medium text-[#7a8070] mb-1.5 tracking-wide">
            Name
          </label>
          <input
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#e4e6e0] rounded-lg text-[#2D312E] placeholder-[#c8ccc4] focus:outline-none focus:border-[#3D5A42]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-[#7a8070] mb-1.5 tracking-wide">
            Email
          </label>
          <input
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#e4e6e0] rounded-lg text-[#2D312E] placeholder-[#c8ccc4] focus:outline-none focus:border-[#3D5A42]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-[#7a8070] mb-1.5 tracking-wide">
            Service
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#e4e6e0] rounded-lg text-[#2D312E] focus:outline-none focus:border-[#3D5A42] bg-white"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-medium text-[#7a8070] mb-1.5 tracking-wide">
            Notes (optional)
          </label>
          <input
            type="text"
            placeholder="Anything we should know?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#e4e6e0] rounded-lg text-[#2D312E] placeholder-[#c8ccc4] focus:outline-none focus:border-[#3D5A42]"
          />
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={onBack}
            className="flex-1 py-3 bg-[#F8F9F5] border border-[#c8ccc4] rounded-xl text-sm text-[#2D312E] hover:bg-[#eef0ea] transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name || !email || !service}
            className="flex-2 flex-[2] py-3 bg-[#3D5A42] rounded-xl text-sm font-medium text-white hover:bg-[#344e38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Book appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
