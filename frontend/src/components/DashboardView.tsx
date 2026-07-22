import { useState, useEffect } from "react";
import { format } from "date-fns";

const logo_path = "/logo.png";

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

interface Appointment {
  id: number;
  time: string;
  client: string;
  email: string;
  service: string;
  status: "pending" | "confirmed" | "cancelled";
  date: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  visits: number;
}

// --- Helpers ---
const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-[#eaf3de] text-[#3b6d11]",
  cancelled: "bg-red-100 text-red-700",
};

// --- Sidebar ---
type Page = "dashboard" | "bookings" | "clients";

const Sidebar = ({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) => {
  const navItem = (label: string, key: Page) => (
    <button
      onClick={() => setPage(key)}
      className={`text-sm text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
        page === key
          ? "bg-white/15 text-white font-medium"
          : "text-white/70 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-[#3D5A42] h-screen w-[200px] flex-shrink-0 flex flex-col p-3 pt-2">
      <div className="flex items-center gap-1 mb-2 mt-1">
        <img src={logo_path} alt="OpenSlot logo" className="h-7 w-7" />
        <span className="text-white font-medium">Open</span>
        <span className="text-[#A6DB24] font-medium">Slot</span>
      </div>
      {navItem("Dashboard", "dashboard")}
      {navItem("Bookings", "bookings")}
      {navItem("Clients", "clients")}
      <button className="mt-auto text-white/70 text-sm text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
        Account
      </button>
    </div>
  );
};

// ─── DASHBOARD PAGE ───────────────────────────────────────────────
const DashboardPage = ({ appointments }: { appointments: Appointment[] }) => {
  const todayAppts = appointments.filter(
    (a) => a.date === format(new Date(), "yyyy-MM-dd"),
  );

  const bookedCount = todayAppts.length;
  const openCount = timeSlots.length - bookedCount;
  const pendingAppts = todayAppts.filter((a) => a.status === "pending");

  return (
    <div className="flex-1 bg-[#F8F9F5] flex flex-col overflow-hidden min-w-0">
      {/* Top bar */}
      <div className="flex items-center justify-between px-7 pt-5 pb-4 flex-shrink-0">
        <div>
          <h1 className="text-[#2D312E] font-medium text-lg">
            {format(new Date(), "EEEE, MMMM d")}
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
          {pendingAppts.length > 0 && (
            <div className="bg-white border border-amber-300 rounded-lg px-3.5 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div>
                <p className="text-[#2D312E] font-medium text-sm leading-none">
                  {pendingAppts.length}
                </p>
                <p className="text-[#7a8070] text-xs mt-0.5">pending</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex overflow-hidden px-7 pb-7 gap-5 min-w-0">
        {/* Schedule panel */}
        <div className="w-2/5 flex-shrink-0 bg-white border border-[#dde0d8] rounded-xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e4e6e0] text-sm font-medium text-[#2D312E] flex-shrink-0 flex items-center justify-between">
            Time slots
            <button className="px-3 py-1.5 bg-[#3D5A42] rounded-xl text-sm font-medium text-white hover:bg-[#344e38] transition-colors">
              add booking
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            {timeSlots.map((slot) => {
              const appt = todayAppts.find((a) => a.time === slot);
              return (
                <div
                  key={slot}
                  className="flex items-start gap-3.5 min-h-[42px] border-t border-[#e4e6e0] first:border-t-0 px-4 pt-1.5 pb-1"
                >
                  <div className="w-[58px] text-[11px] text-[#9aa090] text-right pt-0.5 flex-shrink-0 tabular-nums">
                    {slot}
                  </div>
                  <div>
                    {appt && (
                      <div className="bg-[#3D5A42] text-white rounded-lg px-3 py-1 inline-flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#A6DB24] flex-shrink-0" />
                        <span className="text-xs font-medium">
                          {appt.client}
                        </span>
                        <div className="w-px h-2.5 bg-white/25 flex-shrink-0" />
                        <span className="text-[11px] text-white/60">
                          {appt.service}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Pending confirmations */}
          <div className="flex-[1.2] bg-white border border-[#dde0d8] rounded-xl flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-[#e4e6e0] text-sm font-medium text-[#2D312E] flex-shrink-0">
              Needs confirmation
            </div>
            <div className="overflow-y-auto flex-1 p-3 flex flex-col gap-2">
              {pendingAppts.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-sm text-[#b0b5a8]">All caught up</span>
                </div>
              ) : (
                pendingAppts.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-[#e4e6e0] bg-[#fafaf8]"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#2D312E]">
                        {appt.client}
                      </p>
                      <p className="text-xs text-[#7a8070] mt-0.5">
                        {appt.time} · {appt.service}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#3D5A42] text-white hover:bg-[#344e38] transition-colors">
                        Confirm
                      </button>
                      <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#dde0d8] text-[#7a8070] hover:bg-[#f0f0ec] transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex-[0.8] bg-white border border-[#dde0d8] rounded-xl flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-[#e4e6e0] text-sm font-medium text-[#2D312E] flex-shrink-0">
              This week
            </div>
            <div className="flex-1 flex items-center px-4 gap-6">
              {[
                {
                  label: "Total booked",
                  value: appointments.filter((a) => a.status !== "cancelled")
                    .length,
                },
                {
                  label: "Confirmed",
                  value: appointments.filter((a) => a.status === "confirmed")
                    .length,
                },
                {
                  label: "Pending",
                  value: appointments.filter((a) => a.status === "pending")
                    .length,
                },
                {
                  label: "Cancelled",
                  value: appointments.filter((a) => a.status === "cancelled")
                    .length,
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-medium text-[#2D312E]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#7a8070] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── BOOKINGS PAGE ────────────────────────────────────────────────
const BookingsPage = ({ appointments }: { appointments: Appointment[] }) => {
  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "cancelled"
  >("all");
  const [search, setSearch] = useState("");

  const filtered = appointments.filter((a) => {
    const matchStatus = filter === "all" || a.status === filter;
    const matchSearch =
      a.client.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const tabs: Array<typeof filter> = [
    "all",
    "pending",
    "confirmed",
    "cancelled",
  ];

  return (
    <div className="flex-1 bg-[#F8F9F5] flex flex-col overflow-hidden min-w-0">
      <div className="px-7 pt-5 pb-4 flex-shrink-0">
        <h1 className="text-[#2D312E] font-medium text-lg">Bookings</h1>
        <p className="text-[#7a8070] text-sm mt-0.5">All appointments</p>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden px-7 pb-7 gap-4 min-w-0">
        {/* Filters row */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <input
            type="text"
            placeholder="Search client or service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border border-[#dde0d8] rounded-lg px-3 py-2 text-sm text-[#2D312E] placeholder-[#b0b5a8] outline-none focus:border-[#3D5A42] transition-colors w-64"
          />
          <div className="flex gap-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  filter === t
                    ? "bg-[#3D5A42] text-white"
                    : "bg-white border border-[#dde0d8] text-[#7a8070] hover:bg-[#f0f0ec]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 bg-white border border-[#dde0d8] rounded-xl overflow-hidden flex flex-col">
          <div className="grid grid-cols-5 px-4 py-2.5 border-b border-[#e4e6e0] text-xs text-[#9aa090] font-medium">
            <span>Client</span>
            <span>Service</span>
            <span>Date</span>
            <span>Time</span>
            <span>Status</span>
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <span className="text-sm text-[#b0b5a8]">
                  No appointments found
                </span>
              </div>
            ) : (
              filtered.map((appt) => (
                <div
                  key={appt.id}
                  className="grid grid-cols-5 px-4 py-3 border-t border-[#e4e6e0] first:border-t-0 hover:bg-[#fafaf8] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[#2D312E]">
                      {appt.client}
                    </p>
                    <p className="text-xs text-[#9aa090]">{appt.email}</p>
                  </div>
                  <span className="text-sm text-[#2D312E] self-center">
                    {appt.service}
                  </span>
                  <span className="text-sm text-[#7a8070] self-center tabular-nums">
                    {appt.date}
                  </span>
                  <span className="text-sm text-[#7a8070] self-center tabular-nums">
                    {appt.time}
                  </span>
                  <div className="self-center">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-md capitalize ${statusColors[appt.status]}`}
                    >
                      {appt.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CLIENTS PAGE ─────────────────────────────────────────────────
const ClientsPage = ({
  clients,
  appointments,
}: {
  clients: Client[];
  appointments: Appointment[];
}) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedClient = clients.find((c) => c.id === selected);
  const clientHistory = appointments.filter(
    (a) => selectedClient && a.client === selectedClient.name,
  );

  return (
    <div className="flex-1 bg-[#F8F9F5] flex flex-col overflow-hidden min-w-0">
      <div className="px-7 pt-5 pb-4 flex-shrink-0">
        <h1 className="text-[#2D312E] font-medium text-lg">Clients</h1>
        <p className="text-[#7a8070] text-sm mt-0.5">
          {clients.length} total clients
        </p>
      </div>

      <div className="flex-1 flex overflow-hidden px-7 pb-7 gap-5 min-w-0">
        {/* Client list */}
        <div className="w-2/5 flex-shrink-0 bg-white border border-[#dde0d8] rounded-xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e4e6e0] flex-shrink-0">
            <input
              type="text"
              placeholder="Search clients…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F8F9F5] border border-[#dde0d8] rounded-lg px-3 py-1.5 text-sm text-[#2D312E] placeholder-[#b0b5a8] outline-none focus:border-[#3D5A42] transition-colors"
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.map((client) => (
              <div
                key={client.id}
                onClick={() => setSelected(client.id)}
                className={`flex items-center gap-3 px-4 py-3 border-t border-[#e4e6e0] first:border-t-0 cursor-pointer transition-colors ${
                  selected === client.id ? "bg-[#f0f5f0]" : "hover:bg-[#fafaf8]"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#3D5A42]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-[#3D5A42]">
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#2D312E] truncate">
                    {client.name}
                  </p>
                  <p className="text-xs text-[#9aa090] truncate">
                    {client.email}
                  </p>
                </div>
                <span className="text-xs text-[#9aa090] flex-shrink-0">
                  {client.visits} visit{client.visits !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Client detail */}
        <div className="flex-1 min-w-0 bg-white border border-[#dde0d8] rounded-xl flex flex-col overflow-hidden">
          {!selectedClient ? (
            <div className="flex-1 flex items-center justify-center">
              <span className="text-sm text-[#b0b5a8]">
                Select a client to view details
              </span>
            </div>
          ) : (
            <>
              <div className="px-5 py-4 border-b border-[#e4e6e0] flex-shrink-0 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3D5A42]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-[#3D5A42]">
                    {selectedClient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2D312E]">
                    {selectedClient.name}
                  </p>
                  <p className="text-xs text-[#9aa090]">
                    {selectedClient.email} · {selectedClient.phone}
                  </p>
                </div>
              </div>
              <div className="px-5 py-3 border-b border-[#e4e6e0] flex-shrink-0">
                <p className="text-xs font-medium text-[#9aa090] uppercase tracking-wide">
                  Appointment history
                </p>
              </div>
              <div className="overflow-y-auto flex-1">
                {clientHistory.length === 0 ? (
                  <div className="flex items-center justify-center h-24">
                    <span className="text-sm text-[#b0b5a8]">
                      No appointments found
                    </span>
                  </div>
                ) : (
                  clientHistory.map((appt) => (
                    <div
                      key={appt.id}
                      className="flex items-center justify-between px-5 py-3 border-t border-[#e4e6e0] first:border-t-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#2D312E]">
                          {appt.service}
                        </p>
                        <p className="text-xs text-[#9aa090] mt-0.5">
                          {appt.date} · {appt.time}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-md capitalize ${statusColors[appt.status]}`}
                      >
                        {appt.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────
const DashboardView = () => {
  const [page, setPage] = useState<Page>("dashboard");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const [apptRes, clientRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/appointments/clients`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!apptRes.ok || !clientRes.ok)
          throw new Error("Failed to fetch dashboard data");

        const apptJson = await apptRes.json();
        const clientJson = await clientRes.json();

        const shapedAppointments = apptJson.data.map((a: any) => ({
          ...a,
          date: format(new Date(a.appointment_at), "yyyy-MM-dd"),
          time: format(new Date(a.appointment_at), "h:mm a"),
        }));

        setAppointments(shapedAppointments);
        setClients(clientJson.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-7 text-[#7a8070]">Loading…</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar page={page} setPage={setPage} />
      {page === "dashboard" && <DashboardPage appointments={appointments} />}
      {page === "bookings" && <BookingsPage appointments={appointments} />}
      {page === "clients" && (
        <ClientsPage clients={clients} appointments={appointments} />
      )}
    </div>
  );
};

export default DashboardView;
