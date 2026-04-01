interface ConfirmationProps {
  date: string;
  time: string;
  name: string;
  email: string;
  service: string;
  onCancel: () => void;
  onBackToCalendar: () => void;
}

const Confirmation = ({ date, time, name, email, service, onCancel, onBackToCalendar }: ConfirmationProps) => {
  return (
    <div className="min-h-screen bg-[#F8F9F5] flex items-center justify-center p-4">
      <div className="w-[420px] max-w-full bg-white border border-[#e4e6e0] rounded-2xl p-10 font-sans text-center">

        {/* Check icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#3D5A42] flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 13L9 17L19 7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-medium text-[#2D312E] mb-1.5">You're booked</h1>
        <p className="text-sm text-[#7a8070] mb-7 leading-relaxed">
          A confirmation has been sent to your email.
        </p>

        {/* Details */}
        <div className="bg-[#F8F9F5] border border-[#e4e6e0] rounded-xl p-5 mb-7 text-left space-y-0.5">
            <p className="text-[15px] font-medium text-[#2D312E]">{date} at {time}</p>
            <p className="text-sm text-[#7a8070]">{service} · {name}</p>
            <p className="text-sm text-[#7a8070]">{email}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5">
          <button 
            className="flex-1 py-3 bg-[#F8F9F5] border border-[#c8ccc4] rounded-xl text-sm text-[#2D312E] hover:bg-[#eef0ea] transition-colors"
            onClick={onCancel}
          >
            Cancel appointment
          </button>
          <button 
            className="flex-1 py-3 bg-[#3D5A42] border-none rounded-xl text-sm font-medium text-white hover:bg-[#344e38] transition-colors"
            onClick={onBackToCalendar}
          >
            Back to calendar
          </button>
        </div>

      </div>
    </div>
  );
};

export default Confirmation;