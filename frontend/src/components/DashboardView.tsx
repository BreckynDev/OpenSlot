const timeSlots = [
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
];
const logo_path = "/logo.png";

const appointments = [
  { time: "10:00 AM", client: "Walus Buger", service: "Manicure" },
  { time: "11:00 AM", client: "Kelly  Cudical", service: "Pedicure" },
  { time: "11:30 AM", client: "Lorry Toe", service: "Gel" },
  { time: "5:30 PM", client: "Jerry Fungus", service: "Pedicure" },
];

const DashboardView = () => {
  const bookedCount = appointments.length;
  const openCount = timeSlots.length - bookedCount;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="bg-[#3D5A42] h-screen w-[200px] flex-shrink-0 flex flex-col p-3 pt-2">
        <div className="flex">
          <img src={logo_path} alt="OpenSlot logo" className="h-7 w-7 mt-2" />
          <p className="text-white flex items-center justify-between">Open</p>
          <p className="text-[#A6DB24] flex items-center justify-between">
            Slot
          </p>
        </div>
        <button className="text-white text-sm text-left px-3 py-2 mt-2 rounded-lg bg-white/15 font-medium flex items-center gap-2">
          Dashboard
        </button>
        <button className="text-white/70 text-sm text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
          Bookings
        </button>
        <button className="text-white/70 text-sm text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
          Clients
        </button>
        <button className="mt-auto text-white/70 text-sm text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
          Account
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 bg-[#F8F9F5] flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-7 pt-5 pb-4 flex-shrink-0">
          <div>
            <h1 className="text-[#2D312E] font-medium text-lg">
              Friday, April 18
            </h1>
            <p className="text-[#7a8070] text-sm mt-0.5">Today's schedule</p>
          </div>
          <div className="flex gap-2.5">
            <div className="bg-white border border-[#A6DB24] rounded-lg px-3.5 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3D5A42]" />
              <div>
                <p className="text-[#2D312E] font-medium text-sm leading-none">
                  {bookedCount}
                </p>
                <p className="text-[#7a8070] text-xs mt-0.5">booked</p>
              </div>
            </div>
            <div className="bg-white border border-[#dde0d8] rounded-lg px-3.5 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#A3B18A]" />
              <div>
                <p className="text-[#2D312E] font-medium text-sm leading-none">
                  {openCount}
                </p>
                <p className="text-[#7a8070] text-xs mt-0.5">open</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 flex overflow-hidden px-7 pb-7 gap-5 min-w-0">
          {/* Schedule panel */}
          <div className=" w-2/5 flex-shrink-0 bg-white border border-[#dde0d8] rounded-xl flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-[#e4e6e0] text-sm font-medium text-[#2D312E] flex-shrink-0 flex items-center justify-between">
              Time slots
              <button className="px-3 py-1.5 bg-[#3D5A42] rounded-xl text-sm font-medium text-white hover:bg-[#344e38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                add booking
              </button>
            </div>
            <div className="overflow-y-auto flex-1 scrollbar-thin">
              {timeSlots.map((slot) => {
                const appointment = appointments.find((a) => a.time === slot);
                return (
                  <div
                    key={slot}
                    className="flex items-start gap-3.5 min-h-[42px] border-t border-[#e4e6e0] first:border-t-0 px-4 pt-1.5 pb-1"
                  >
                    <div className="w-[58px] text-[11px] text-[#9aa090] text-right pt-0.5 flex-shrink-0 tabular-nums">
                      {slot}
                    </div>
                    <div>
                      {appointment && (
                        <div className="bg-[#3D5A42] text-white rounded-lg px-3 py-1 inline-flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#A6DB24] flex-shrink-0" />
                          <span className="text-xs font-medium">
                            {appointment.client}
                          </span>
                          <div className="w-px h-2.5 bg-white/25 flex-shrink-0" />
                          <span className="text-[11px] text-white/60">
                            {appointment.service}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel — placeholder for future content */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div className="flex-[1.2] bg-white border border-[#dde0d8] rounded-xl flex items-center justify-center">
              <span className="text-sm text-[#b0b5a8]">Upcoming summary</span>
            </div>
            <div className="flex-[0.8] bg-white border border-[#dde0d8] rounded-xl flex items-center justify-center">
              <span className="text-sm text-[#b0b5a8]">Quick actions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
