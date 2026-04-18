interface CancellationProps {
  date: string;
  time: string;
  name: string;
  email: string;
  service: string;
  onConfirmCancel: () => void;
  onKeepAppointment: () => void;
}

const Cancellation = ({
  date,
  time,
  name,
  email,
  service,
  onConfirmCancel,
  onKeepAppointment,
}: CancellationProps) => {
  return (
    <div className="min-h-screen bg-[#F8F9F5] flex items-center justify-center p-4">
      <div className="w-[420px] max-w-full bg-white border border-[#e4e6e0] rounded-2xl p-10 font-sans text-center">
        {/* X icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#c0392b] flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-medium text-[#2D312E] mb-1.5">
          Cancel appointment?
        </h1>
        <p className="text-sm text-[#7a8070] mb-7 leading-relaxed">
          This can't be undone. Are you sure you want to cancel?
        </p>

        {/* Details */}
        <div className="bg-[#F8F9F5] border border-[#e4e6e0] rounded-xl p-5 mb-7 text-left space-y-0.5">
          <p className="text-[15px] font-medium text-[#2D312E]">
            {date} at {time}
          </p>
          <p className="text-sm text-[#7a8070]">
            {service} · {name}
          </p>
          <p className="text-sm text-[#7a8070]">{email}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5">
          <button
            className="flex-1 py-3 bg-[#F8F9F5] border border-[#c8ccc4] rounded-xl text-sm text-[#2D312E] hover:bg-[#eef0ea] transition-colors"
            onClick={onKeepAppointment}
          >
            Keep appointment
          </button>
          <button
            className="flex-1 py-3 bg-[#c0392b] border-none rounded-xl text-sm font-medium text-white hover:bg-[#a93226] transition-colors"
            onClick={onConfirmCancel}
          >
            Yes, cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;
