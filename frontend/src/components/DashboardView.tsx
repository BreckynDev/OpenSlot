// Temp Variables
const timeSlots = [
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

const appointments = [
  { time: "10:00 AM", client: "Walus Buger", service: "Manicure" },
  { time: "11:30 AM", client: "Lorry Toe", service: "Gel" },
  { time: "5:30 PM", client: "Jerry fungus", service: "Pedicure" },
];

const DashboardView = () => {
  return (
    <div className="flex">
      <div className="bg-[#3D5A42] h-screen p-5 pt-8 w-48 flex flex-col gap-1">
        <button className="text-white font-medium text-sm text-left px-3 py-2 rounded-lg hover:bg-[#344e38] transition-colors">
          Dashboard
        </button>
        <button className="text-white font-medium text-sm text-left px-3 py-2 rounded-lg hover:bg-[#344e38] transition-colors">
          Bookings
        </button>
        <button className="text-white font-medium text-sm text-left px-3 py-2 rounded-lg hover:bg-[#344e38] transition-colors">
          Clients
        </button>
        <button className="text-white font-medium text-sm text-left px-3 py-2 rounded-lg hover:bg-[#344e38] transition-colors">
          Account
        </button>
      </div>
      <div className="min-h-screen bg-[#F8F9F5] flex-1 p-8">
        {timeSlots.map((slot) => {
          const appointment = appointments.find((a) => a.time === slot);
          return (
            <div
              key={slot}
              className="flex gap-4 mb-2 border-b border-[#e4e6e0]"
            >
              <div className="w-20 text-sm text-[#7a8070]">{slot}</div>
              {appointment ? (
                <div className=" bg-[#3D5A42] text-white text-sm px-4 py-.5 rounded-lg">
                  {appointment.client} · {appointment.service}
                </div>
              ) : (
                <div className="flex-1"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardView;
